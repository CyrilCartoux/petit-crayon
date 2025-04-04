'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-1/2">
          <Image
            src="/images/family.jpg"
            alt="Image en couleur"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute right-0 inset-y-0 w-1/2">
          <Image
            src="/images/familybw.jpg"
            alt="Image en noir et blanc"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/75" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Transforme n&apos;importe quelle image en coloriage à imprimer !
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Notre IA magique transforme vos photos, dessins et portraits en superbes coloriages. 
            Parfait pour les enfants, les artistes en herbe ou simplement pour se détendre !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/editor" className="btn-primary text-xl">
              Choisir une image
            </Link>
          </motion.div>
        </div>

        {/* Section Tarifs */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Débloque plus de créations !</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-4xl font-bold mb-4">2$</p>
              <p className="text-gray-600 mb-4">5 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-4">5$</p>
              <p className="text-gray-600 mb-4">20 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-4xl font-bold mb-4">10$</p>
              <p className="text-gray-600 mb-4">50 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
