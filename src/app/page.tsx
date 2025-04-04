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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Transformez vos <span className="text-primary">photos</span> en <br className="hidden md:block" />
            <span className="text-primary">coloriages magiques</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Notre IA transforme instantanément vos photos en superbes coloriages. 
            <br className="hidden md:block" />
            Parfait pour les enfants, les artistes en herbe ou simplement pour se détendre !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Link 
                href="/editor" 
                className="relative inline-flex items-center justify-center px-8 py-4 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/50"
              >
                Essayer gratuitement
                <svg 
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Section Tarifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Débloque plus de créations !</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card bg-white shadow-lg"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4">Starter</h3>
                <p className="text-3xl md:text-4xl font-bold mb-4">2$</p>
                <p className="text-gray-600 mb-4">5 coloriages</p>
                <Link href="/paiement?plan=starter" className="btn-primary w-full block text-center">Choisir</Link>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card bg-white shadow-lg"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4">Pro</h3>
                <p className="text-3xl md:text-4xl font-bold mb-4">5$</p>
                <p className="text-gray-600 mb-4">20 coloriages</p>
                <Link href="/paiement?plan=pro" className="btn-primary w-full block text-center">Choisir</Link>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card bg-white shadow-lg"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4">Premium</h3>
                <p className="text-3xl md:text-4xl font-bold mb-4">10$</p>
                <p className="text-gray-600 mb-4">50 coloriages</p>
                <Link href="/paiement?plan=premium" className="btn-primary w-full block text-center">Choisir</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
