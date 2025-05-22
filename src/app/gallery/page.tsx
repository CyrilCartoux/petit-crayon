'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface Coloring {
  id: string
  original_image: string
  generated_image: string
  created_at: string
}

export default function Gallery() {
  const [colorings, setColorings] = useState<Coloring[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColoring, setSelectedColoring] = useState<Coloring | null>(null)
  const { t } = useLanguage()

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images/history')
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        const data = await response.json()
        setColorings(data.images)
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('gallery.myGallery.title')}</h1>
          <p className="text-xl text-gray-600">{t('gallery.myGallery.description')}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : colorings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('gallery.myGallery.empty')}</p>
            <Link
              href="/editor"
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
            >
              {t('gallery.myGallery.createButton')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {colorings.map((coloring) => (
              <motion.div
                key={coloring.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => setSelectedColoring(coloring)}
              >
                <div className="relative h-48">
                  <Image
                    src={coloring.generated_image}
                    alt={t('gallery.myGallery.imageAlt')}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('gallery.myGallery.coloring')}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {t('gallery.myGallery.createdAt', { date: new Date(coloring.created_at).toLocaleDateString() })}
                  </p>
                  <a
                    href={coloring.generated_image}
                    download={`coloriage-${coloring.id}.png`}
                    className="flex items-center justify-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    {t('gallery.myGallery.download')}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal pour afficher le coloriage en grand */}
      <AnimatePresence>
        {selectedColoring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedColoring(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{t('gallery.myGallery.coloring')}</h2>
                <button
                  onClick={() => setSelectedColoring(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative h-[60vh] mb-6">
                <Image
                  src={selectedColoring.generated_image}
                  alt={t('gallery.myGallery.imageAlt')}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex justify-center">
                <a
                  href={selectedColoring.generated_image}
                  download={`coloriage-${selectedColoring.id}.png`}
                  className="flex items-center px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t('gallery.myGallery.download')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 