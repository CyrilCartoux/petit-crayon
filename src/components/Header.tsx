'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Petit Crayon"
                width={150}
                height={150}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Menu hamburger pour mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[var(--color-primary)]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/gallery" className="text-gray-600 hover:text-[var(--color-primary)]">
              Galerie
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Bonjour, {user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 rounded-md hover:border-[var(--color-primary)] transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              href="/gallery" 
              className="block text-gray-600 hover:text-[var(--color-primary)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Galerie
            </Link>
            {user ? (
              <div className="space-y-4">
                <div className="text-gray-600">
                  Bonjour, {user.email}
                </div>
                <button
                  onClick={() => {
                    signOut()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] border border-gray-300 rounded-md hover:border-[var(--color-primary)] transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary-dark)] transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
} 