'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export default function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setError(null)
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
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors du traitement de l\'image')
      }

      const data = await response.json()
      setResult(data.result[0])
    } catch (error) {
      console.error('Erreur lors du traitement:', error)
      setError('Une erreur est survenue lors du traitement de l\'image. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Transformez votre image</h1>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          >
            {error}
          </motion.div>
        )}
        
        {!image ? (
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
                  ? "Déposez l'image ici..."
                  : "Glissez-déposez une image ou cliquez pour sélectionner"}
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
                <Image
                  src={image}
                  alt="Image à traiter"
                  className="w-full h-full object-contain rounded-lg"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {!result && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProcess}
                disabled={isProcessing}
                className="btn-primary w-full text-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="h-6 w-6 animate-spin mr-2" />
                    Traitement en cours...
                  </div>
                ) : (
                  'Transformer en coloriage'
                )}
              </motion.button>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-white/80 backdrop-blur-sm"
              >
                <h2 className="text-xl font-bold mb-4">Votre coloriage est prêt !</h2>
                <div className="relative aspect-video mb-4">
                  <Image
                    src={result}
                    alt="Coloriage généré"
                    className="w-full h-full object-contain rounded-lg"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex gap-4">
                  <Link
                    href={result}
                    download="coloriage.png"
                    className="btn-primary flex-1 text-center"
                  >
                    Télécharger
                  </Link>
                  <button 
                    onClick={() => window.print()}
                    className="btn-secondary flex-1"
                  >
                    Imprimer
                  </button>
                  <button 
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                    }}
                    className="btn-primary flex-1 bg-gray-500 hover:bg-gray-600"
                  >
                    Nouvelle image
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 