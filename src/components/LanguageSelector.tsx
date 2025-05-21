'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLanguage(language === 'fr-FR' ? 'en-US' : 'fr-FR')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm">
          {language === 'fr-FR' ? '🇫🇷' : '🇬🇧'}
        </span>
        <span className="text-sm font-medium">
          {language === 'fr-FR' ? t('common.french') : t('common.english')}
        </span>
      </motion.button>
    </div>
  )
} 