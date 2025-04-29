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
  title: "Petit Crayon - Transformez vos images en coloriages",
  description: "Transformez n'importe quelle image en coloriage à imprimer grâce à l'IA !",
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
