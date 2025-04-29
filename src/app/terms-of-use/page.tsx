'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TermsOfUse() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
          <p className="text-gray-500 mb-8">Dernière mise à jour : {currentDate}</p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptation des Conditions</h2>
            <p>
              En accédant et en utilisant le site web Petit Crayon (ci-après dénommé "le Site"), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site.
            </p>

            <h2>2. Description du Service</h2>
            <p>
              Petit Crayon propose un service de transformation de photographies en dessins à colorier. Les utilisateurs peuvent télécharger des photos, qui sont ensuite converties en dessins à colorier via une technologie d'intelligence artificielle.
            </p>

            <h2>3. Utilisation du Service</h2>
            <p>
              Vous acceptez de ne pas utiliser le Site pour :
            </p>
            <ul>
              <li>Violer les droits de propriété intellectuelle d'autrui</li>
              <li>Transmettre du contenu illégal, diffamatoire ou offensant</li>
              <li>Interférer avec le fonctionnement normal du Site</li>
              <li>Tenter d'accéder à des zones du Site non autorisées</li>
            </ul>

            <h2>4. Propriété Intellectuelle</h2>
            <p>
              Tous les contenus présents sur le Site, y compris les textes, graphiques, logos, images et logiciels, sont la propriété de Petit Crayon ou de ses concédants de licence et sont protégés par les lois sur la propriété intellectuelle.
            </p>

            <h2>5. Limitation de Responsabilité</h2>
            <p>
              Petit Crayon ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du Site ou de l'impossibilité d'y accéder.
            </p>

            <h2>6. Modification des Conditions</h2>
            <p>
              Petit Crayon se réserve le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur le Site.
            </p>

            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant ces conditions, veuillez nous contacter à l'adresse suivante :{' '}
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