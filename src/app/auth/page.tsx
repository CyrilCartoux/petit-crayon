'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

function AuthForm() {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Si l'utilisateur vient de /editor, on affiche directement le mode inscription
    const fromEditor = searchParams.get('from') === 'editor'
    if (fromEditor) {
      setIsLogin(false)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setRegistrationSuccess(false)
    setIsLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.error === 'Email not confirmed') {
          throw new Error(t('auth.common.error.emailNotConfirmed'))
        }
        throw new Error(data.message || t('auth.common.error.generic'))
      }

      if (!isLogin) {
        setRegistrationSuccess(true)
        setEmail('')
        setPassword('')
      } else {
        window.location.href = data.redirectUrl || '/'
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.common.error.generic'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      const response = await fetch('/api/auth/google', {
        method: 'GET',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || t('auth.common.error.generic'))
      }

      window.location.assign(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.common.error.generic'))
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card bg-white/80 backdrop-blur-sm p-8 ${isLogin ? 'border-t-4 border-[var(--color-primary)]' : 'border-t-4 border-[var(--color-primary-dark)]'}`}
    >
      <div className="text-center mb-8">
        <Image
          src="/images/logo.png"
          alt="Petit Crayon"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <div className="mb-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-white text-[var(--color-primary)] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('auth.login.title')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-white text-[var(--color-primary)] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('auth.register.title')}
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isLogin ? t('auth.login.welcome') : t('auth.register.welcome')}
        </h1>
        <p className="text-gray-600 mt-2">
          {isLogin ? t('auth.login.description') : t('auth.register.description')}
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {registrationSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          <p className="font-medium">{t('auth.common.success.title')}</p>
          <p className="mt-1">{t('auth.common.success.description')}</p>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md active:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-medium">{t('auth.common.loading')}</span>
            </div>
          ) : (
            <>
              <Image
                src="/images/google-logo.png"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="font-medium">{t('auth.common.continueWithGoogle')}</span>
            </>
          )}
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{t('auth.common.or')}</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('auth.common.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('auth.common.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full relative py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isLogin 
              ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]' 
              : 'bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)]'
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isLogin ? t('auth.login.loading') : t('auth.register.loading')}
            </div>
          ) : (
            isLogin ? t('auth.login.button') : t('auth.register.button')
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? (
          <p>
            {t('auth.login.noAccount')}{' '}
            <button
              onClick={() => setIsLogin(false)}
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
            >
              {t('auth.login.createAccount')}
            </button>
          </p>
        ) : (
          <p>
            {t('auth.register.hasAccount')}{' '}
            <button
              onClick={() => setIsLogin(true)}
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
            >
              {t('auth.register.login')}
            </button>
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="card bg-white/80 backdrop-blur-sm p-8 animate-pulse">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        }>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  )
} 