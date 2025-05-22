'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCredits } from '@/contexts/CreditsContext'
import { useRouter } from 'next/navigation'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { credits, loading } = useCredits()
  const router = useRouter()
  const { t } = useLanguage()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    return user?.email || '';
  };

  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  const getUserEmail = () => {
    return user?.email || '';
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Petit Crayon"
                  width={120}
                  height={120}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/gallery')}
                  className="cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Galerie</span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="cursor-pointer flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-lg">
                      {getUserInitial()}
                    </div>
                  </button>
                  {/* Menu utilisateur */}
                  {isUserMenuOpen && (
                    <div ref={menuRef} className="absolute top-full right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2">
                          <p className="font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                          <p className="text-sm text-gray-500 truncate" title={getUserEmail()}>{getUserEmail()}</p>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="px-4 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Crédits :</span>
                            {loading ? (
                              <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                            ) : (
                              <span className="text-sm font-bold text-[var(--color-primary)]">{credits}</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              router.push('/paiement');
                              setIsUserMenuOpen(false);
                            }}
                            className="mt-2 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Acheter des crédits
                          </button>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="px-4 py-2">
                          <LanguageSelector />
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <button
                          onClick={() => {
                            signOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          {t('header.disconnect')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!user && (
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Link
                  href="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                >
                  {t('header.connection')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 