import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CreditsProvider } from '@/contexts/CreditsContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"
import LogRocketProvider from '@/components/LogRocketProvider';
import { LanguageProvider } from '@/contexts/LanguageContext'

const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petit Crayon - Transformez vos photos en coloriages magiques",
  description: "Transformez vos souvenirs en coloriages uniques grâce à l'IA ! Créez des moments magiques avec vos enfants en coloriant vos photos préférées. Simple, rapide et amusant.",
  keywords: [
    "coloriage personnalisé",
    "photos en coloriage",
    "coloriage IA",
    "coloriage enfant",
    "dessin à imprimer",
    "famille créative",
    "activité ludique IA",
    "coloriage photo",
    "souvenirs à colorier"
  ],  
  openGraph: {
    title: "Petit Crayon - Transformez vos photos en coloriages magiques",
    description: "Donnez vie à vos souvenirs en les transformant en coloriages uniques. Parfait pour les moments en famille et l'éveil créatif des enfants.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Petit Crayon",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
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
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`],
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
  verification: {
    google: '8nkfalni4Pck7vaZW1CsRW98l9OJIKnfGuGLh5Lt0d8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="8nkfalni4Pck7vaZW1CsRW98l9OJIKnfGuGLh5Lt0d8" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57225RT7');
          `}
        </Script>
      </head>
      <body className={fredoka.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-57225RT7"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageProvider>
          <AuthProvider>
            <CreditsProvider>
              <LogRocketProvider />
              <Header />
              
              <main className="min-h-screen pt-16">
                {children}
              </main>

              <Footer />
              <SpeedInsights />
              <Analytics />
            </CreditsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
