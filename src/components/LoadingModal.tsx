'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({ isOpen, message = 'On prépare votre coloriage magique... ✨' }: LoadingModalProps) {
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start({ width: "100%" });
      const timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000);

      return () => {
        clearTimeout(timer);
        controls.set({ width: "0%" });
      };
    } else {
      setShowLongLoadingMessage(false);
      controls.set({ width: "0%" });
    }
  }, [isOpen, controls]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-[var(--color-accent)]"
              initial={{ width: "0%" }}
              animate={controls}
              transition={{ duration: 20, ease: "linear" }}
            />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{message}</h3>
          {showLongLoadingMessage && (
            <p className="mt-2 text-sm text-gray-500">
              On y est presque ! Notre IA met la dernière touche à votre chef-d&apos;œuvre 🎨
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Prenez une petite pause, on s&apos;occupe de tout ! ☕️
          </p>
        </div>
      </motion.div>
    </div>
  );
} 