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
  console.log('🔄 Webhook Stripe reçu');
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      console.error('❌ Signature manquante dans les headers');
      return NextResponse.json(
        { error: 'Signature manquante' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ Événement Stripe vérifié:', event.type);
    } catch (err) {
      console.error('❌ Erreur de vérification de la signature:', err);
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      console.log('💰 Session de paiement complétée');
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const creditsAmount = parseInt(session.metadata?.creditsAmount || '0');

      console.log('📊 Détails de la session:', {
        userId,
        creditsAmount,
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
        customerEmail: session.customer_email
      });

      if (!userId || isNaN(creditsAmount) || creditsAmount < 0) {
        console.error('❌ Données de session invalides:', {
          userId,
          creditsAmount,
          isValidUserId: !!userId,
          isValidAmount: !isNaN(creditsAmount) && creditsAmount > 0
        });
        return NextResponse.json(
          { error: 'Données de session invalides' },
          { status: 400 }
        );
      }

      // Récupérer les crédits actuels
      console.log('🔍 Récupération des crédits actuels pour l\'utilisateur:', userId);
      const { data: currentData, error: fetchError } = await supabaseService
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single();

      if (fetchError) {
        console.error('❌ Erreur lors de la récupération des crédits:', {
          error: fetchError,
          errorCode: fetchError.code
        });
        if (fetchError.code !== 'PGRST116') {
          throw fetchError;
        }
        console.log('ℹ️ Aucun crédit existant trouvé, initialisation à 0');
      }

      const currentCredits = currentData?.credits || 0;
      const newCredits = currentCredits + creditsAmount;
      console.log('📈 Mise à jour des crédits:', {
        currentCredits,
        creditsToAdd: creditsAmount,
        newCredits
      });

      // Mettre à jour les crédits
      const { error: updateError } = await supabaseService
        .from('user_credits')
        .upsert({ 
          user_id: userId,
          credits: newCredits
        });

      if (updateError) {
        console.error('❌ Erreur lors de la mise à jour des crédits:', updateError);
        throw updateError;
      }

      console.log('✅ Crédits mis à jour avec succès:', newCredits);

      // Enregistrer la transaction
      console.log('📝 Enregistrement de la transaction');
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
        console.error('⚠️ Erreur lors de l\'enregistrement de la transaction:', transactionError);
        // On ne throw pas l'erreur car les crédits ont déjà été ajoutés
      } else {
        console.log('✅ Transaction enregistrée avec succès');
      }

      return NextResponse.json({ success: true });
    }

    console.log('ℹ️ Événement non traité:', event.type);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    );
  }
} 