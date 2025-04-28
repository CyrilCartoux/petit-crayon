import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CreditsProvider } from '@/contexts/CreditsContext'
import GalleryPreview from "@/components/GalleryPreview";

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
        <AuthProvider>
          <CreditsProvider>
            <Header />
            
            <main className="min-h-screen pt-16">
              {children}
            </main>

            <GalleryPreview />
            <Footer />
          </CreditsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
