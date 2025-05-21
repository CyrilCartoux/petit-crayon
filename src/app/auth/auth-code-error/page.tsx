'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AuthCodeError() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('auth.error.generic'));
      }

      setSuccess(t('auth.error.resend.success'));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-white/80 backdrop-blur-sm p-8"
        >
          <div className="text-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Petit Crayon"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('auth.error.title')}
            </h1>
            <p className="text-gray-600">
              {t('auth.error.description')}
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('auth.error.resend.loading')}
                </div>
              ) : (
                t('auth.error.resend.button')
              )}
            </button>

            <button
              onClick={() => router.push('/auth')}
              className="w-full text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              {t('auth.error.back')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 