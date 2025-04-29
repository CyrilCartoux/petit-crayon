'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
          <p className="text-gray-500 mb-8">Dernière mise à jour : {currentDate}</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Chez Petit Crayon, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
            </p>

            <h2>2. Collecte des Données</h2>
            <p>
              Nous collectons les informations suivantes :
            </p>
            <ul>
              <li>Informations de compte (email, nom)</li>
              <li>Photos téléchargées pour la transformation en coloriages</li>
              <li>Données de paiement (gérées par Stripe)</li>
              <li>Données d&apos;utilisation du site</li>
            </ul>

            <h2>3. Utilisation des Données</h2>
            <p>
              Vos données sont utilisées pour :
            </p>
            <ul>
              <li>Fournir et améliorer nos services</li>
              <li>Traiter vos commandes et paiements</li>
              <li>Vous envoyer des communications importantes</li>
              <li>Assurer la sécurité de nos services</li>
            </ul>

            <h2>4. Protection des Données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>

            <h2>5. Partage des Données</h2>
            <p>
              Nous ne partageons vos données qu&apos;avec :
            </p>
            <ul>
              <li>Stripe pour le traitement des paiements</li>
              <li>Les services d&apos;hébergement et d&apos;infrastructure</li>
              <li>Les autorités compétentes si requis par la loi</li>
            </ul>

            <h2>6. Vos Droits</h2>
            <p>
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul>
              <li>Accéder à vos données</li>
              <li>Les rectifier ou les supprimer</li>
              <li>Vous opposer à leur traitement</li>
              <li>Demander la portabilité de vos données</li>
            </ul>

            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant cette politique ou vos données, contactez-nous à :{' '}
              <a href="mailto:petitcrayon.fr@gmail.com" className="text-blue-600 hover:text-blue-800">
                petitcrayon.fr@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 