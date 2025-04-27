'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const examples = [
  {
    id: 1,
    original: '/images/examples/sable-original.jpg',
    coloring: '/images/examples/sable-coloring.png',
    title: 'Châteaux de sable à la plage',
    description: '➔ De la photo au coloriage magique'
  },
  {
    id: 2,
    original: '/images/examples/animaux-original.jpg',
    coloring: '/images/examples/animaux-coloring.png',
    title: 'Jeux complices avec les animaux',
    description: '➔ Capturez ces moments tendres'
  },
  {
    id: 3,
    original: '/images/examples/zoo-original.jpg',
    coloring: '/images/examples/zoo-coloring.png',
    title: 'Journée inoubliable au zoo',
    description: '➔ ➔ Vos explorations deviennent créatives'
  }
];

export default function GalleryPreview() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[var(--color-primary)]/5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transformez vos souvenirs en aventures à colorier.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transformez vos photos en coloriages uniques et personnalisés. 
            Voici quelques exemples de ce que vous pouvez créer.
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
                      alt={`${example.title} - Original`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative">
                    <Image
                      src={example.coloring}
                      alt={`${example.title} - Coloriage`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {example.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {example.description}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Link
                  href="/editor"
                  className="w-full block text-center px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-md transition-colors"
                >
                  Essayer
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-md transition-colors"
          >
            Voir plus d&apos;exemples
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