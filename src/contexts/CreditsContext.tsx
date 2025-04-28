'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type CreditsContextType = {
  credits: number;
  loading: boolean;
  error: string | null;
  addCredits: (amount: number) => Promise<void>;
  useCredits: (amount: number) => Promise<boolean>;
  refreshCredits: () => Promise<void>;
};

const CreditsContext = createContext<CreditsContextType>({
  credits: 0,
  loading: true,
  error: null,
  addCredits: async () => {},
  useCredits: async () => false,
  refreshCredits: async () => {},
});

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/credits');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des crédits');
      }
      const data = await response.json();
      setCredits(data.credits);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des crédits');
      console.error('Error fetching credits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  const addCredits = async (amount: number) => {
    if (!user) return;

    try {
      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout de crédits');
      }

      const data = await response.json();
      setCredits(data.credits);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout de crédits');
      console.error('Error adding credits:', err);
    }
  };

  const useCredits = async (amount: number): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch('/api/credits/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.error === 'Pas assez de crédits') {
          return false;
        }
        throw new Error(error.error || 'Erreur lors de l\'utilisation des crédits');
      }

      const data = await response.json();
      setCredits(data.credits);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'utilisation des crédits');
      console.error('Error using credits:', err);
      return false;
    }
  };

  return (
    <CreditsContext.Provider
      value={{
        credits,
        loading,
        error,
        addCredits,
        useCredits,
        refreshCredits: fetchCredits,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
}

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
}; 