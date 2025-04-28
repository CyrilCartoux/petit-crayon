'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useCredits } from '@/contexts/CreditsContext'
import LoadingModal from '@/components/LoadingModal'
import confetti from 'canvas-confetti'
import { useRouter } from 'next/navigation'

export default function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { credits, loading: creditsLoading, useCredits: checkCredits } = useCredits()
  const router = useRouter()

  useEffect(() => {
    if (result) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result]);

  const processImage = async (imageData: string) => {
    setIsProcessing(true)
    setError(null)
    
    try {
      const hasEnoughCredits = await checkCredits(1)
      if (!hasEnoughCredits) {
        setError('Vous n\'avez pas assez de crédits pour effectuer cette opération.')
        return
      }

      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors du traitement de l&apos;image')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error('Erreur lors du traitement:', error)
      setError('Une erreur est survenue lors du traitement de l&apos;image. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  })

  const handleProcess = async () => {
    if (!image) return
    await processImage(image)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transformez votre image</h1>
          {user && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-full">
              <span className="text-sm font-medium text-gray-700">Crédits restants</span>
              {creditsLoading ? (
                <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
              ) : (
                <span className="text-sm font-bold text-[var(--color-primary)]">{credits}</span>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            {error}
          </motion.div>
        )}

        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-white/80 backdrop-blur-sm p-6 mb-6"
          >
            <p className="text-center text-gray-600">
              Vous devez être connecté pour transformer vos images en coloriages.
            </p>
            <div className="mt-4 flex justify-center">
              <a
                href="/auth"
                className="btn-primary"
              >
                Se connecter
              </a>
            </div>
          </motion.div>
        )}
        
        {user && !image ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-white/80 backdrop-blur-sm"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                ${isDragActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-gray-300'}`}
            >
              <input {...getInputProps()} />
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg text-gray-600">
                {isDragActive
                  ? 'Déposez l&apos;image ici...'
                  : 'Glissez-déposez une image ou cliquez pour sélectionner'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Formats acceptés: PNG, JPG, JPEG
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="card bg-white/80 backdrop-blur-sm">
              <div className="relative aspect-video">
                {image && (
                  <Image
                    src={image}
                    alt="Image à traiter"
                    className="w-full h-full object-contain rounded-lg"
                    width={500}
                    height={500}
                  />
                )}
              </div>
            </div>

            {!result && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (credits <= 0) {
                    router.push('/paiement')
                  } else {
                    handleProcess()
                  }
                }}
                disabled={isProcessing || creditsLoading}
                className={`btn-primary w-full text-xl ${(creditsLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="h-6 w-6 animate-spin mr-2" />
                    Traitement en cours...
                  </div>
                ) : creditsLoading ? (
                  'Chargement des crédits...'
                ) : credits <= 0 ? (
                  'Acheter des crédits'
                ) : (
                  'Transformer en coloriage (1 crédit)'
                )}
              </motion.button>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-white/80 backdrop-blur-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">Votre coloriage</h2>
                {isValidImageUrl(result) ? (
                  <div className="relative aspect-video mb-6">
                    <Image
                      src={result}
                      alt="Coloriage généré"
                      className="w-full h-full object-contain rounded-lg"
                      width={500}
                      height={500}
                      priority
                      onError={(e) => {
                        console.error('Erreur de chargement de l&apos;image:', e)
                        setError('Erreur lors du chargement de l&apos;image générée. Veuillez réessayer.')
                        setResult(null)
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-red-500 mb-6">
                    Erreur: URL de l&apos;image invalide ou non autorisée
                  </div>
                )}
                <div className="mt-6 flex gap-4">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = result
                      link.download = 'coloriage.png'
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="btn-primary flex-1"
                  >
                    Télécharger
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="btn-primary flex-1"
                  >
                    Imprimer
                  </button>
                  <button 
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                    }}
                    className="btn-primary flex-1"
                  >
                    Nouvelle image
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <LoadingModal 
        isOpen={isProcessing} 
        message="Génération de votre coloriage en cours..."
      />
    </div>
  )
}

function isValidImageUrl(url: string): boolean {
  try {
    // Vérifier si c&apos;est une URL de données
    if (url.startsWith('data:image/')) {
      return true
    }

    // Vérifier si c&apos;est une URL HTTP/HTTPS
    const parsedUrl = new URL(url)
    return (
      (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') &&
      parsedUrl.hostname.includes('replicate.delivery')
    )
  } catch {
    return false
  }
} 