'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import getStripe from '@/utils/stripe-client'
import { useAuth } from '@/contexts/AuthContext'
import PromoOffers from '@/components/PromoOffers'

interface Plan {
  name: string
  price: number
  coloriages: number
  description: string
  type: 'one-time'
  popular?: boolean
}

interface PromoCode {
  code: string
  id: string
  coupon: {
    id: string
    percent_off: number | null
    amount_off: number | null
    currency: string
  }
}

const plans: Record<string, Plan> = {
  mini: {
    name: 'Mini',
    price: 1.49,
    coloriages: 2,
    description: '🖍️ Parfait pour tester en douceur.',
    type: 'one-time'
  },
  starter: {
    name: 'Starter',
    price: 3.49,
    coloriages: 5,
    description: '✨ Le pack idéal pour transformer vos plus belles photos.',
    type: 'one-time'
  },
  famille: {
    name: 'Famille',
    price: 7.99,
    coloriages: 12,
    description: '👨‍👩‍👧‍👦 Pour revivre vos plus beaux souvenirs en famille.',
    type: 'one-time',
    popular: true
  }
}

function PaiementContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const plan = searchParams.get('plan') as keyof typeof plans
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans.starter)
  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)

  useEffect(() => {
    if (plan && plans[plan]) {
      setSelectedPlan(plans[plan])
    }
  }, [plan])

  const handlePlanChange = (newPlan: keyof typeof plans) => {
    setPromoCode('')
    setAppliedPromo(null)
    setPromoError(null)
    router.push(`/paiement?plan=${newPlan}`)
  }

  const handlePromoCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError(null)

    try {
      const response = await fetch('/api/promotions/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: promoCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      setAppliedPromo(data)
    } catch (err) {
      setPromoError(err instanceof Error ? err.message : 'Une erreur est survenue')
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push('/auth')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          plan: selectedPlan.name.toLowerCase(),
          promoCode: appliedPromo?.id
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      if (!stripe) throw new Error('Stripe failed to initialize')

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFinalPrice = (plan: Plan) => {
    if (plan.name !== selectedPlan.name || !appliedPromo) return plan.price

    if (appliedPromo.coupon.percent_off) {
      return plan.price * (1 - appliedPromo.coupon.percent_off / 100)
    }

    if (appliedPromo.coupon.amount_off) {
      return Math.max(0, plan.price - (appliedPromo.coupon.amount_off / 100))
    }

    return plan.price
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* En-tête */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Finalisez votre achat
            </h1>
            <p className="text-white/90">
              Vous êtes sur le point de débloquer {selectedPlan.coloriages} coloriages
            </p>
          </div>

          {/* Contenu */}
          <div className="p-6 md:p-8">
            {/* Offres promotionnelles */}
            <PromoOffers selectedPlan={selectedPlan.name} />

            {/* Sélecteur de plan */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choisissez votre plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanChange(key as keyof typeof plans)}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      selectedPlan.name === plan.name
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
                        POPULAIRE
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {getFinalPrice(plan).toFixed(2)}€
                      <span className="text-sm text-gray-500 ml-1">
                        / une fois
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {plan.coloriages} coloriages
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Code promo */}
            <div className="mb-8">
              <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Entrez votre code promo"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Appliquer
                </button>
              </form>
              {promoError && (
                <p className="mt-2 text-sm text-red-600">{promoError}</p>
              )}
              {appliedPromo && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-medium text-green-800">
                    Code promo appliqué : {appliedPromo.code}
                  </p>
                  {appliedPromo.coupon.percent_off && (
                    <p className="text-sm text-green-600">
                      Réduction de {appliedPromo.coupon.percent_off}%
                    </p>
                  )}
                  {appliedPromo.coupon.amount_off && (
                    <p className="text-sm text-green-600">
                      Réduction de {(appliedPromo.coupon.amount_off / 100).toFixed(2)} {appliedPromo.coupon.currency.toUpperCase()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Récapitulatif du plan */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h2>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">{getFinalPrice(selectedPlan).toFixed(2)}€</span>
                {appliedPromo && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {selectedPlan.price}€
                  </span>
                )}
                <span className="text-gray-500 ml-2">
                  / une fois
                </span>
              </div>
            </div>

            {/* Bouton de paiement */}
            <motion.button
              onClick={handlePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </div>
              ) : (
                `Payer ${getFinalPrice(selectedPlan).toFixed(2)}€`
              )}
            </motion.button>

            {/* Sécurité */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Image src="/images/stripe.png" alt="Stripe" width={100} height={100} />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Vos données sont protégées par le cryptage SSL et Stripe
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Paiement() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <PaiementContent />
    </Suspense>
  )
} 