"use client";

import { useEffect } from 'react';
import { initLogRocket } from '@/utils/logrocket';

export default function LogRocketProvider() {
  useEffect(() => {
    initLogRocket();
  }, []);

  return null;
} 