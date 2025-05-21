'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PromoOffer {
  code: string
  originalPrice: number
  promoPrice: number
  coloriages: number
  discount: number
  plan: 'mini' | 'starter' | 'famille'
}

const promoOffers: PromoOffer[] = [
  {
    code: 'BONJOUR1',
    originalPrice: 1.49,
    promoPrice: 1.00,
    coloriages: 2,
    discount: 33,
    plan: 'mini'
  },
  {
    code: 'COULEUR3',
    originalPrice: 3.49,
    promoPrice: 1.99,
    coloriages: 5,
    discount: 43,
    plan: 'starter'
  },
  {
    code: 'FAMILLE10',
    originalPrice: 7.99,
    promoPrice: 3.99,
    coloriages: 12,
    discount: 50,
    plan: 'famille'
  }
]

interface PromoOffersProps {
  selectedPlan?: string
}

export default function PromoOffers({ selectedPlan }: PromoOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { t } = useLanguage()

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Si un plan est sélectionné, ne montrer que l'offre correspondante
  const offersToShow = selectedPlan 
    ? promoOffers.filter(offer => offer.plan === selectedPlan.toLowerCase())
    : promoOffers

  if (offersToShow.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {t(offersToShow.length === 1 ? 'promo.title.single' : 'promo.title.multiple')}
        </h2>
        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
          {t('promo.validity')}
        </span>
      </div>

      <div className={`grid ${selectedPlan ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
        {offersToShow.map((offer) => (
          <motion.div
            key={offer.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-xl border-2 border-[var(--color-primary)] p-4"
          >
            <div className="absolute -top-3 -right-3 bg-[var(--color-primary)] text-white text-sm font-bold px-3 py-1 rounded-full">
              -{offer.discount}%
            </div>

            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  {offer.promoPrice}€
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {offer.originalPrice}€
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {t('promo.coloriages', { count: offer.coloriages })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                {offer.code}
              </code>
              <button
                onClick={() => copyToClipboard(offer.code)}
                className="px-3 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
              >
                {copiedCode === offer.code ? t('promo.copied') : t('promo.copy')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {t(offersToShow.length === 1 ? 'promo.footer.single' : 'promo.footer.multiple')}
        </p>
      </div>
    </div>
  )
} 