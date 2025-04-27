'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Plan {
  name: string
  price: number
  coloriages: number
  description: string
  type: 'one-time'
  popular?: boolean
}

const plans: Record<string, Plan> = {
  starter: {
    name: 'Starter',
    price: 4.99,
    coloriages: 10,
    description: '✨ Le début parfait pour découvrir la magie de vos souvenirs à colorier.',
    type: 'one-time'
  },
  explorer: {
    name: 'Explorer',
    price: 9.99,
    coloriages: 25,
    description: '🎉 Idéal pour donner vie à tous vos meilleurs moments, sans compter !',
    type: 'one-time',
    popular: true
  },
  creatif: {
    name: 'Créatif',
    price: 17.99,
    coloriages: 50,
    description: '🚀 Libérez votre créativité et transformez tous vos souvenirs en chefs-d\'œuvre à colorier !',
    type: 'one-time'
  }
}

function PaiementContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get('plan') as keyof typeof plans
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans.starter)

  useEffect(() => {
    if (plan && plans[plan]) {
      setSelectedPlan(plans[plan])
    }
  }, [plan])

  const handlePlanChange = (newPlan: keyof typeof plans) => {
    router.push(`/paiement?plan=${newPlan}`)
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
                      {plan.price}€
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

            {/* Récapitulatif du plan */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h2>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">{selectedPlan.price}€</span>
                <span className="text-gray-500 ml-2">
                  / une fois
                </span>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <form className="space-y-6">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de carte
                </label>
                <input
                  type="number"
                  id="card-number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={16}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                    Date d&apos;expiration
                  </label>
                  <input
                    type="number"
                    id="expiry"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="MMAA"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="number"
                    id="cvc"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom sur la carte
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="JEAN DUPONT"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Payer {selectedPlan.price}€
              </motion.button>
            </form>

            {/* Sécurité */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Paiement sécurisé par Stripe</p>
              <div className="mt-2 flex justify-center space-x-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 16.5h3v-9h-3v9zm6-9h-3v9h3v-9z" />
                </svg>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 16.5h3v-9h-3v9zm6-9h-3v9h3v-9z" />
                </svg>
              </div>
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