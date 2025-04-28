'use client';

import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({ isOpen, message = 'Génération en cours...' }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <ArrowPathIcon className="h-12 w-12 text-primary animate-spin" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{message}</h3>
          <p className="mt-2 text-sm text-gray-500">
            Veuillez patienter quelques instants. Ne quittez pas cette page et ne la rafraîchissez pas.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 