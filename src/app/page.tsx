"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background images - Optimisé pour mobile */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 h-1/2">
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="min-h-[100vh] md:min-h-screen flex flex-col justify-center items-center text-center py-12 md:py-20">
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

        {/* Section Plans - Optimisée pour mobile avec carousel */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Offrez des heures de créativité
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Choisissez le forfait qui correspond à vos besoins
              </p>
            </div>

            {/* Carousel pour mobile, grille pour desktop */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                className="pb-8"
              >
                <SwiperSlide>
                  <PlanCard
                    title="Starter"
                    description="✨ Le début parfait pour découvrir la magie"
                    price="4,99€"
                    features={["10 coloriages"]}
                    href="/paiement?plan=starter"
                    isPopular={false}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <PlanCard
                    title="Explorer"
                    description="🎉 Idéal pour donner vie à tous vos meilleurs moments"
                    price="9,99€"
                    features={["25 coloriages"]}
                    href="/paiement?plan=explorer"
                    isPopular={true}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <PlanCard
                    title="Créatif"
                    description="🚀 Libérez votre créativité sans limites"
                    price="17,99€"
                    features={["50 coloriages"]}
                    href="/paiement?plan=creatif"
                    isPopular={false}
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Grille pour desktop */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              <PlanCard
                title="Starter"
                description="✨ Le début parfait pour découvrir la magie"
                price="4,99€"
                features={["10 coloriages"]}
                href="/paiement?plan=starter"
                isPopular={false}
              />
              <PlanCard
                title="Explorer"
                description="🎉 Idéal pour donner vie à tous vos meilleurs moments"
                price="9,99€"
                features={["25 coloriages"]}
                href="/paiement?plan=explorer"
                isPopular={true}
              />
              <PlanCard
                title="Créatif"
                description="🚀 Libérez votre créativité sans limites"
                price="17,99€"
                features={["50 coloriages"]}
                href="/paiement?plan=creatif"
                isPopular={false}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Composant PlanCard réutilisable
function PlanCard({ title, description, price, features, href, isPopular }: {
  title: string;
  description: string;
  price: string;
  features: string[];
  href: string;
  isPopular: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 ${isPopular ? 'border-primary' : 'border-gray-100'} relative h-full`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
          POPULAIRE
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        {description}
      </p>
      <div className="flex items-baseline mb-4 sm:mb-6">
        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
          {price}
        </span>
        <span className="text-sm sm:text-base text-gray-500 ml-2">
          / paiement unique
        </span>
      </div>
      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm sm:text-base text-gray-600">
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
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`block w-full font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
          isPopular
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Choisir
      </Link>
    </div>
  );
}
