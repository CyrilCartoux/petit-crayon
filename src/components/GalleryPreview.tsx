'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const examples = [
  {
    id: 'beach',
    original: '/images/examples/plage-original.jpg',
    coloring: '/images/examples/plage-coloring.png',
  },
  {
    id: 'zoo',
    original: '/images/examples/elephant-original.jpg',
    coloring: '/images/examples/elephant-coloring.png',
  },
  {
    id: 'birthday',
    original: '/images/examples/anniversaire-original.jpg',
    coloring: '/images/examples/anniversaire-coloring.png',
  }
];

const showcaseExamples = [
  {
    id: 'cars',
    image: '/images/showcase/ferrari.jpeg',
    icon: '🚗'
  },
  {
    id: 'food',
    image: '/images/showcase/burger.png',
    icon: '🍽️'
  },
  {
    id: 'nature',
    image: '/images/showcase/chien.jpeg',
    icon: '🦁'
  }
];

export default function GalleryPreview() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[var(--color-primary)]/5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('gallery.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="grid grid-cols-2 h-full">
                  <div className="relative">
                    <Image
                      src={example.original}
                      alt={`${t(`gallery.examples.${example.id}.title`)} - Original`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src={example.coloring}
                      alt={`${t(`gallery.examples.${example.id}.title`)} - Coloriage`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {t(`gallery.examples.${example.id}.title`)}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {t(`gallery.examples.${example.id}.description`)}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Link
                  href="/editor"
                  className="w-full block text-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-md transition-colors"
                >
                  {t('gallery.cta.try')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nouvelle section Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('gallery.showcase.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('gallery.showcase.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseExamples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-96">
                  <Image
                    src={example.image}
                    alt={t(`gallery.showcase.themes.${example.id}.title`)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-6 left-6 text-4xl">
                    {example.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {t(`gallery.showcase.themes.${example.id}.title`)}
                    </h3>
                    <p className="text-white/90 text-lg mb-4">
                      {t(`gallery.showcase.themes.${example.id}.description`)}
                    </p>
                    <Link
                      href="/editor"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/30"
                    >
                      {t('gallery.cta.create')}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/editor"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-md transition-colors"
          >
            {t('gallery.cta.main')}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 