import { createClient } from '@/utils/supabase/server';
import stripe from '@/utils/stripe';
import { NextResponse } from 'next/server';
import { logApiError, logApiSuccess, ErrorWithMessage } from '@/utils/logger';

const PRICE_IDS = {
  essai: 'price_1RLNEILhIVDGgy4tqLGWANQc',
  mini: 'price_1RLMRiLhIVDGgy4tFPMiGnmO',
  starter: 'price_1RLMSpLhIVDGgy4tGcOIE7dF',
  famille: 'price_1RLMTWLhIVDGgy4txlLuVZ1h',
};

const CREDITS_BY_PLAN = {
  essai: 1,
  mini: 2,
  starter: 5,
  famille: 12,
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      logApiError(authError || new Error('User not authenticated'), 'create-checkout-session', request);
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    
    const { plan, promoCode } = await request.json();
    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS];
    const creditsAmount = CREDITS_BY_PLAN[plan as keyof typeof CREDITS_BY_PLAN];
    console.log(priceId, creditsAmount, plan);

    if (!priceId || !creditsAmount) {
      logApiError(new Error(`Invalid plan: ${plan}`), 'create-checkout-session', request);
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
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement?plan=${plan}`,
      metadata: {
        userId: user.id,
        plan: plan,
        creditsAmount: creditsAmount.toString(),
      },
      discounts: promoCode ? [{ promotion_code: promoCode }] : undefined,
    });

    logApiSuccess({ sessionId: session.id, plan, creditsAmount }, 'create-checkout-session');
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    logApiError(error as ErrorWithMessage, 'create-checkout-session', request);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
} 