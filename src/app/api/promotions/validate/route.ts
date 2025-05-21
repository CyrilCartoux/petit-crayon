import { NextResponse } from 'next/server'
import stripe from '@/utils/stripe'
import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    console.log('Code promo reçu:', code)

    if (!code) {
      return NextResponse.json(
        { error: 'Le code promo est requis' },
        { status: 400 }
      )
    }

    // Recherche du code promo dans Stripe
    const promotionCodes = await stripe.promotionCodes.list({
      code: code.toUpperCase(),
      active: true,
      expand: ['data.coupon']
    })

    console.log('Résultat de la recherche:', {
      total: promotionCodes.data.length,
      codes: promotionCodes.data.map(pc => ({
        code: pc.code,
        id: pc.id,
        active: pc.active,
        coupon: pc.coupon
      }))
    })

    if (promotionCodes.data.length === 0) {
      // Essayons de récupérer tous les codes promo pour déboguer
      const allPromoCodes = await stripe.promotionCodes.list({
        active: true,
        limit: 100
      })
      console.log('Tous les codes promo actifs:', allPromoCodes.data.map(pc => pc.code))

      return NextResponse.json(
        { error: 'Code promo invalide' },
        { status: 400 }
      )
    }

    const promotionCode = promotionCodes.data[0]

    // Vérifier si le code a atteint sa limite d'utilisation
    if (
      promotionCode.max_redemptions &&
      promotionCode.times_redeemed >= promotionCode.max_redemptions
    ) {
      return NextResponse.json(
        { error: 'Ce code promo a atteint sa limite d\'utilisation' },
        { status: 400 }
      )
    }

    // Le coupon est déjà inclus dans la réponse grâce à l'expansion
    const coupon = promotionCode.coupon as Stripe.Coupon

    console.log('Code promo validé:', {
      code: promotionCode.code,
      id: promotionCode.id,
      coupon: {
        id: coupon.id,
        percent_off: coupon.percent_off,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
      }
    })

    return NextResponse.json({
      code: promotionCode.code,
      id: promotionCode.id,
      coupon: {
        id: coupon.id,
        percent_off: coupon.percent_off,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
      },
    })
  } catch (error) {
    console.error('Error validating promo code:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la validation du code promo' },
      { status: 500 }
    )
  }
} 