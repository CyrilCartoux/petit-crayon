import { createClient } from '@/utils/supabase/server';
import stripe from '@/utils/stripe';
import { NextResponse } from 'next/server';

const PRICE_IDS = {
  starter: 'price_1RIsaOPudOzsr0MVosGbSN56',
  explorer: 'price_1RIsbQPudOzsr0MVudEQgZFv',
  créatif: 'price_1RIsc9PudOzsr0MVR42XazZC',
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { plan } = await request.json();
    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS];

    if (!priceId) {
      return NextResponse.json(
        { error: 'Plan invalide' },
        { status: 400 }
      );
    }

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement`,
      metadata: {
        userId: user.id,
        plan: plan,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
} 