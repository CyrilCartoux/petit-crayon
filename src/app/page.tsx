"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background images - Optimisé pour mobile */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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

      {/* Overlay gradient - Ajusté pour mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/95 md:from-white/50" />

      {/* Content - Optimisé pour mobile */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
          >
            Transformez vos{" "}
            <span className="text-primary">photos</span> en{" "}
            <span className="text-primary">coloriages magiques</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Découvrez la magie de transformer vos plus beaux souvenirs en coloriages uniques. 
            Une expérience créative inoubliable pour toute la famille !
          </motion.p>

          <div className="text-center mt-8 sm:mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/editor"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Créer mon coloriage
                <svg
                  className="ml-3 -mr-1 w-5 h-5 sm:w-6 sm:h-6"
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
            </motion.div>
          </div>

          {/* Section Plans - Optimisée pour mobile */}
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Offrez des heures de créativité
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Choisissez le forfait qui correspond à vos besoins
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Plan Starter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Starter
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">✨ Le début parfait pour découvrir la magie</p>
                  <div className="flex items-baseline mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">4,99€</span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">
                      / paiement unique
                    </span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center text-sm sm:text-base text-gray-600">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      10 coloriages
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=starter"
                    className="block w-full bg-gray-100 text-gray-900 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Choisir
                  </Link>
                </div>

                {/* Plan Explorer */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-primary relative">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
                    POPULAIRE
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Explorer
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">🎉 Idéal pour donner vie à tous vos meilleurs moments</p>
                  <div className="flex items-baseline mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      9,99€
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">
                      / paiement unique
                    </span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center text-sm sm:text-base text-gray-600">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      25 coloriages
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=explorer"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm sm:text-base"
                  >
                    Choisir
                  </Link>
                </div>

                {/* Plan Créatif */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-gray-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Créatif
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    🚀 Libérez votre créativité sans limites
                  </p>
                  <div className="flex items-baseline mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      17,99€
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-2">/ paiement unique</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center text-sm sm:text-base text-gray-600">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      50 coloriages
                    </li>
                  </ul>
                  <Link
                    href="/paiement?plan=creatif"
                    className="block w-full bg-gray-100 text-gray-900 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base"
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
  );
}
