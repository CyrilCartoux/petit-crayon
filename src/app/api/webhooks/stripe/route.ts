import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import stripe from '@/utils/stripe';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Créer un client Supabase avec le service role key
const supabaseService = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  console.log('webhook');
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Signature manquante' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('⬆️ event received', event.type);
    } catch (err) {
      console.error('Erreur de vérification de la signature:', err);
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      console.log('checkout.session.completed');
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const creditsAmount = parseInt(session.metadata?.creditsAmount || '0');

      console.log('creditsAmount', creditsAmount);

      if (!userId || isNaN(creditsAmount) || creditsAmount < 0) {
        console.log('Données de session invalides, userId', userId, 'creditsAmount', creditsAmount);
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

      console.log('user current credits', currentData);
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      const currentCredits = currentData?.credits || 0;
      const newCredits = currentCredits + creditsAmount;

      // Mettre à jour les crédits
      const { error: updateError } = await supabaseService
        .from('user_credits')
        .update({ credits: newCredits })
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }

      console.log('user credits updated ✅', newCredits);

      // Enregistrer la transaction
      const { error: transactionError } = await supabaseService
        .from('credit_transactions')
        .insert({
          user_id: userId,
          amount: creditsAmount,
          type: 'purchase',
          metadata: {
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
            timestamp: new Date().toISOString(),
          },
        });

      if (transactionError) {
        console.error('Erreur lors de l\'enregistrement de la transaction:', transactionError);
        // On ne throw pas l'erreur car les crédits ont déjà été ajoutés
      }

      console.log('transaction inserted', creditsAmount);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
} 