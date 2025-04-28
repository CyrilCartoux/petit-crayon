'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Success() {
  const router = useRouter()

  useEffect(() => {
    // Lancer les confettis
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timer = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval as NodeJS.Timeout)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Paiement réussi !
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Félicitations ! Vos crédits ont été ajoutés à votre compte. Vous pouvez maintenant commencer à transformer vos photos en coloriages.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/editor')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Commencer mes créations
            </motion.button>

            <div className="mt-8 text-sm text-gray-500">
              <p>Vous serez redirigé vers l&apos;éditeur de coloriages</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 