import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import Image from 'next/image'

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petit Crayon - Transformez vos images en coloriages",
  description: "Transformez n'importe quelle image en coloriage à imprimer grâce à l'IA !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={fredoka.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Petit Crayon"
                  width={150}
                  height={150}
                />
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-[var(--color-primary)]">
                  Accueil
                </Link>
                <Link href="/gallery" className="text-gray-600 hover:text-[var(--color-primary)]">
                  Galerie
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/images/logo.png"
                  alt="Petit Crayon"
                  width={250}
                  height={250}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">À propos</h3>
                <p className="text-gray-600">
                  Transformez vos photos en coloriages magiques avec notre IA.
                  Parfait pour les enfants et les artistes en herbe.
                </p>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-600">
                  contact@petitcrayon.fr<br />
                  +33 6 12 34 56 78
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
              <p>© 2024 Petit Crayon. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
