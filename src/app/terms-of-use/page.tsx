'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsOfUse() {
  const { t } = useLanguage()
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const getTranslatedItems = (key: string): string[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = t(key, { returnObjects: true } as any)
    return Array.isArray(items) ? items : []
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('terms.title')}</h1>
          <p className="text-gray-500 mb-8">{t('terms.lastUpdate', { date: currentDate })}</p>

          <div className="prose prose-lg max-w-none">
            <h2>{t('terms.sections.acceptance.title')}</h2>
            <p>{t('terms.sections.acceptance.content')}</p>

            <h2>{t('terms.sections.description.title')}</h2>
            <p>{t('terms.sections.description.content')}</p>

            <h2>{t('terms.sections.usage.title')}</h2>
            <p>{t('terms.sections.usage.content')}</p>
            <ul>
              {getTranslatedItems('terms.sections.usage.items').map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('terms.sections.intellectualProperty.title')}</h2>
            <p>{t('terms.sections.intellectualProperty.content')}</p>

            <h2>{t('terms.sections.liability.title')}</h2>
            <p>{t('terms.sections.liability.content')}</p>

            <h2>{t('terms.sections.modifications.title')}</h2>
            <p>{t('terms.sections.modifications.content')}</p>

            <h2>{t('terms.sections.contact.title')}</h2>
            <p>
              {t('terms.sections.contact.content')}{' '}
              <a href="mailto:petitcrayon.fr@gmail.com" className="text-blue-600 hover:text-blue-800">
                petitcrayon.fr@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 