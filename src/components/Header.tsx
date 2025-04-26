import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
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
          <div className="flex items-center space-x-4">
            <Link href="/gallery" className="text-gray-600 hover:text-[var(--color-primary)]">
              Galerie
            </Link>
            <Link 
              href="/auth" 
              className="text-gray-600 hover:text-[var(--color-primary)]"
            >
              Se connecter
            </Link>
            <Link 
              href="/auth" 
              className="btn-primary"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
} 