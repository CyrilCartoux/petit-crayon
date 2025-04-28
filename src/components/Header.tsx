'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCredits } from '@/contexts/CreditsContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { credits, loading } = useCredits()
  const router = useRouter()

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
                  className="cursor-pointer hover:opacity-80 transition-opacity"                />
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/paiement')}
                  className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">Crédits :</span>
                  {loading ? (
                    <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    <span className="text-sm font-bold text-[var(--color-primary)]">{credits}</span>
                  )}
                </button>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-lg">
                    {getUserInitial()}
                  </div>
                </button>
              </div>
            )}
            {!user && (
              <Link
                href="/auth"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Menu utilisateur */}
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-medium">{getUserDisplayName()}</p>
              <p className="text-gray-500">{getUserEmail()}</p>
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
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </header>
  );
} 