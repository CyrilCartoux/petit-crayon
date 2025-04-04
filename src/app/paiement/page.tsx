'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const plans = {
  starter: {
    name: 'Starter',
    price: 2,
    coloriages: 5,
    description: 'Parfait pour commencer',
    type: 'one-time'
  },
  pro: {
    name: 'Pro',
    price: 5,
    coloriages: 20,
    description: 'Pour les utilisateurs réguliers',
    type: 'one-time'
  },
  premium: {
    name: 'Premium',
    price: 10,
    coloriages: 50,
    description: 'Pour les passionnés',
    type: 'one-time'
  },
  unlimited: {
    name: 'Illimité',
    price: 19.99,
    coloriages: 'illimités',
    description: 'Pour les créateurs passionnés',
    type: 'subscription'
  }
}

export default function Paiement() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') as keyof typeof plans
  const [selectedPlan, setSelectedPlan] = useState(plans.starter)

  useEffect(() => {
    if (plan && plans[plan]) {
      setSelectedPlan(plans[plan])
    }
  }, [plan])

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
              {selectedPlan.type === 'subscription' ? 'Finalisez votre abonnement' : 'Finalisez votre achat'}
            </h1>
            <p className="text-white/90">
              {selectedPlan.type === 'subscription' 
                ? 'Vous êtes sur le point de débloquer des coloriages illimités'
                : `Vous êtes sur le point de débloquer ${selectedPlan.coloriages} coloriages`}
            </p>
          </div>

          {/* Contenu */}
          <div className="p-6 md:p-8">
            {/* Récapitulatif du plan */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h2>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">{selectedPlan.price}$</span>
                <span className="text-gray-500 ml-2">
                  {selectedPlan.type === 'subscription' ? '/mois' : '/ une fois'}
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
                  type="text"
                  id="card-number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
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
                {selectedPlan.type === 'subscription' ? 'S\'abonner' : 'Payer'} {selectedPlan.price}$
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