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
        {/* Conteneur des images */}
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-full">
          {/* Image en couleur */}
          <div className="relative">
            <Image
              src="/images/family.jpg"
              alt="Image en couleur"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Image en noir et blanc */}
          <div className="relative">
            <Image
              src="/images/familybw.jpg"
              alt="Image en noir et blanc"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/95" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Transforme n&apos;importe quelle image en coloriage à imprimer !
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Notre IA magique transforme vos photos, dessins et portraits en superbes coloriages. 
            Parfait pour les enfants, les artistes en herbe ou simplement pour se détendre !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/editor" className="btn-primary text-lg md:text-xl">
              Choisir une image
            </Link>
          </motion.div>
        </div>

        {/* Section Tarifs */}
        <div className="mt-24 md:mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Débloque plus de créations !</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">Starter</h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">2$</p>
              <p className="text-gray-600 mb-4">5 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">Pro</h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">5$</p>
              <p className="text-gray-600 mb-4">20 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="card bg-white/80 backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">Premium</h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">10$</p>
              <p className="text-gray-600 mb-4">50 coloriages</p>
              <button className="btn-primary w-full">Choisir</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
