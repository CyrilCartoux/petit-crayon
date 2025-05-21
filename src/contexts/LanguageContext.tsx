'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import frFR from '@/locales/fr-FR.json'
import enUS from '@/locales/en-US.json'

type Language = 'fr-FR' | 'en-US'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const translations = {
  'fr-FR': frFR,
  'en-US': enUS,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr-FR')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'fr-FR' || savedLanguage === 'en-US')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language]

    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    if (typeof value !== 'string') return key

    if (params) {
      return Object.entries(params).reduce((acc, [key, val]) => {
        return acc.replace(`{${key}}`, String(val))
      }, value)
    }

    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 