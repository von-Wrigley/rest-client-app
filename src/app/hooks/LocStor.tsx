'use client';

import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: []) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved as string);
    return initial || defaultValue;
  }
}

export const useLocalStorage = (key: string, defaultValue: []) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return getStorageValue(key, defaultValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
