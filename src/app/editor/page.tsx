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
  const [error, setError] = useState<{ message: string; details?: string } | null>(null)
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
        setError({ 
          message: 'Vous n\'avez pas assez de crédits pour effectuer cette opération.',
          details: 'Veuillez acheter des crédits supplémentaires pour continuer.'
        })
        return
      }

      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError({ 
          message: data.error || 'Une erreur est survenue lors du traitement de l\'image.',
          details: data.details
        })
        return
      }

      setResult(data.result)
    } catch (error) {
      console.error('Erreur lors du traitement:', error)
      setError({ 
        message: 'Une erreur est survenue lors du traitement de l\'image.',
        details: 'Veuillez réessayer plus tard ou contacter le support si le problème persiste.'
      })
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
          <h1 className="text-3xl font-bold">🖍️ Prêt(e) pour une aventure colorée ?</h1>
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
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error.message}
                </h3>
                {error.details && (
                  <div className="mt-2 text-sm text-red-700">
                    {error.details}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-white/80 backdrop-blur-sm p-8 mb-8 text-center"
          >
            <div className="mb-6">
              <Image
                src="/images/logo.png"
                alt="Livre de coloriage"
                width={500}
                height={500}
                className="mx-auto mb-4"
              />
            </div>
            <p className="text-gray-600 mb-6">
              Transforme tes photos préférées en super coloriages
              <br />
              <span className="font-semibold text-[var(--color-primary)]">Première fois ? Crée ton compte ! </span>
            </p>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/auth')}
                className="btn-primary w-full max-w-xs mx-auto"
              >
                C&apos;est parti ! 🚀
              </button>
              <p className="text-sm text-gray-500">
                Pas encore de compte ? <span className="text-[var(--color-primary)] cursor-pointer" onClick={() => router.push('/auth')}>Rejoins la fête ! 🎉</span>
              </p>
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
                  ? '🎨 Super ! Lâche ta photo ici !'
                  : 'Glisse-dépose ta photo ou clique pour commencer l\'aventure !'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Formats acceptés: PNG, JPG, JPEG ✨
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
                {image && (
            <div className="card bg-white/80 backdrop-blur-sm">
              <div className="relative aspect-video">
                  <>
                    <Image
                      src={image}
                      alt="Image à traiter"
                      className="w-full h-full object-contain rounded-lg"
                      width={500}
                      height={500}
                    />
                    <button
                      onClick={() => {
                        setImage(null)
                        setResult(null)
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
              </div>
            </div>
                )}

            {!result && user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (!user) {
                      router.push('/auth')
                    } else if (credits <= 0) {
                      router.push('/paiement')
                    } else {
                      handleProcess()
                    }
                  }}
                  disabled={isProcessing || creditsLoading}
                  className={`btn-primary flex-1 text-xl ${(creditsLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <ArrowPathIcon className="h-6 w-6 animate-spin mr-2" />
                      Patience... La magie opère ! ✨
                    </div>
                  ) : creditsLoading ? (
                    'Chargement des crédits...'
                  ) : credits <= 0 ? (
                    'Besoin de plus de crédits ? 🎨'
                  ) : (
                    'Transforme ta photo en coloriage (1 crédit) 🎨'
                  )}
                </motion.button>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-white/80 backdrop-blur-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">🎨 Ta création est prête !</h2>
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
                        setError({ 
                          message: 'Erreur lors du chargement de l&apos;image générée.',
                          details: 'Veuillez réessayer plus tard ou contacter le support si le problème persiste.'
                        })
                        setResult(null)
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-red-500 mb-6">
                    Oups ! Une erreur est survenue avec l&apos;image 😅
                  </div>
                )}
                <div className="mt-6 flex gap-4">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = result
                      link.download = `coloriage-${Math.random().toString(36).substring(2, 8)}.png`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="btn-primary flex-1"
                  >
                    Télécharger ✨
                  </button>
                  <button 
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                    }}
                    className="btn-primary flex-1"
                  >
                    Nouvelle création 🎨
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