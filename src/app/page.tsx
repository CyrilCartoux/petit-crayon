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

          {/* Section Plans */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Débloque plus de créations</h2>
                <p className="text-lg text-gray-600">Choisis le plan qui te correspond</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Plan Starter */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 mb-4">Parfait pour commencer</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">2$</span>
                    <span className="text-gray-500 ml-2">/ une fois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      5 coloriages
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=starter"
                    className="block w-full bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Choisir
                  </Link>
                </div>

                {/* Plan Premium */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary relative">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
                    POPULAIRE
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                  <p className="text-gray-600 mb-4">Pour les passionnés</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">10$</span>
                    <span className="text-gray-500 ml-2">/ une fois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      50 coloriages
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=premium"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
                  >
                    Choisir
                  </Link>
                </div>

                {/* Plan Illimité */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Illimité</h3>
                  <p className="text-gray-600 mb-4">Pour les créateurs passionnés</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">19.99$</span>
                    <span className="text-gray-500 ml-2">/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Coloriages illimités
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=unlimited"
                    className="block w-full bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Choisir
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
