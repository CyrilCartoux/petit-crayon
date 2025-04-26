'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <Link 
              href="/auth" 
              className="btn-primary"
            >
              Connexion
            </Link>
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
            <Link 
              href="/auth" 
              className="block btn-primary w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
} 