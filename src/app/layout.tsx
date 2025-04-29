import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CreditsProvider } from '@/contexts/CreditsContext'
import GalleryPreview from "@/components/GalleryPreview";
import { SpeedInsights } from "@vercel/speed-insights/next"


const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petit Crayon - Transformez vos photos en coloriages magiques",
  description: "Transformez vos souvenirs en coloriages uniques grâce à l'IA ! Créez des moments magiques avec vos enfants en coloriant vos photos préférées. Simple, rapide et amusant.",
  keywords: "coloriage, photos en coloriage, IA, souvenirs, famille, enfants, créativité, dessin, transformation photo",
  openGraph: {
    title: "Petit Crayon - Transformez vos photos en coloriages magiques",
    description: "Donnez vie à vos souvenirs en les transformant en coloriages uniques. Parfait pour les moments en famille et l'éveil créatif des enfants.",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Petit Crayon - Transformez vos photos en coloriages'
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Petit Crayon - Transformez vos photos en coloriages magiques",
    description: "Donnez vie à vos souvenirs en les transformant en coloriages uniques. Parfait pour les moments en famille et l'éveil créatif des enfants.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    // Ajoutez ici vos variables d'environnement spécifiques
    // Par exemple: MY_VARIABLE: process.env.MY_VARIABLE
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  })
  
  return (
    <html lang="fr">
      <body className={fredoka.className}>
        <AuthProvider>
          <CreditsProvider>
            <Header />
            
            <main className="min-h-screen pt-16">
              {children}
            </main>

            <GalleryPreview />
            <Footer />
            <SpeedInsights />
          </CreditsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
