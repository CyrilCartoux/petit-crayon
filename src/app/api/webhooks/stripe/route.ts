import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe, { Stripe } from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const amount = parseInt(session.metadata?.amount || '0');

      if (!userId || !amount) {
        throw new Error('Missing metadata in session');
      }

      const supabase = await createClient();

      // Mettre à jour les crédits de l'utilisateur
      const { data: currentData } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', userId)
        .single();

      const currentCredits = currentData?.credits || 0;

      // Mettre à jour les crédits
      await supabase
        .from('user_credits')
        .upsert({
          user_id: userId,
          credits: currentCredits + amount,
        });

      // Enregistrer la transaction
      await supabase
        .from('credit_transactions')
        .insert({
          user_id: userId,
          amount: amount,
          type: 'purchase',
          metadata: {
            stripe_session_id: session.id,
            timestamp: new Date().toISOString(),
          },
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
} 