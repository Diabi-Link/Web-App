/* Custom localStorage hook from https://usehooks.com/useLocalStorage */

import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
): readonly [T | null, (value: T) => void, (keyToRemove: string) => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const removeValue = (keyToRemove: string) => {
    window.localStorage.removeItem(keyToRemove);
    setStoredValue(null);
  };

  return [storedValue, setValue, removeValue] as const;
};
