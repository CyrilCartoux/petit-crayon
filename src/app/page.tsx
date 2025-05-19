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
          <div className="relative h-full">
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
          <div className="relative h-full">
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center py-12 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight max-w-3xl mx-auto"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 sm:mt-12"
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
      </div>
    </div>
  );
}
