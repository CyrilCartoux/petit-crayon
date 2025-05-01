import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import stripe from '@/utils/stripe';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { logApiError, logApiSuccess } from '@/utils/logger';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Créer un client Supabase avec le service role key
const supabaseService = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      logApiError(new Error('Missing signature in headers'), 'stripe-webhook', request);
      return NextResponse.json(
        { error: 'Signature manquante' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logApiSuccess({ eventType: event.type }, 'stripe-webhook-verification');
    } catch (err) {
      logApiError(err, 'stripe-webhook-verification', request);
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const creditsAmount = parseInt(session.metadata?.creditsAmount || '0');

      if (!userId || isNaN(creditsAmount) || creditsAmount < 0) {
        logApiError(
          new Error(`Invalid session data: userId=${userId}, creditsAmount=${creditsAmount}`),
          'stripe-webhook',
          request
        );
        return NextResponse.json(
          { error: 'Données de session invalides' },
          { status: 400 }
        );
      }

      // Récupérer les crédits actuels
      const { data: currentData, error: fetchError } = await supabaseService
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single();

      if (fetchError) {
        if (fetchError.code !== 'PGRST116') {
          logApiError(fetchError, 'stripe-webhook-credits-fetch', request);
          throw fetchError;
        }
      }

      const currentCredits = currentData?.credits || 0;
      const newCredits = currentCredits + creditsAmount;

      // Mettre à jour les crédits
      const { error: updateError } = await supabaseService
        .from('user_credits')
        .upsert({ user_id: userId, credits: newCredits });

      if (updateError) {
        logApiError(updateError, 'stripe-webhook-credits-update', request);
        throw updateError;
      }

      // Enregistrer la transaction
      const { error: transactionError } = await supabaseService
        .from('credit_transactions')
        .insert({
          user_id: userId,
          amount: creditsAmount,
          type: 'purchase',
          metadata: {
            session_id: session.id,
            payment_intent: session.payment_intent,
            plan: session.metadata?.plan,
            timestamp: new Date().toISOString()
          }
        });

      if (transactionError) {
        logApiError(transactionError, 'stripe-webhook-transaction', request);
        throw transactionError;
      }

      logApiSuccess({
        userId,
        creditsAdded: creditsAmount,
        newTotal: newCredits,
        sessionId: session.id
      }, 'stripe-webhook');

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logApiError(error, 'stripe-webhook', request);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
} 