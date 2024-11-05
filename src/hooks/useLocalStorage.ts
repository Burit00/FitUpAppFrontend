import { useEffect, useState } from 'react';
import { TLocalStorageKey } from '@/constants/LocalStorageKeys';

type TUseLocalStorageResponse<T> = [T, (value: T) => void, () => void];

export function useLocalStorage<T>(key: TLocalStorageKey, initialValue: T | null = null): TUseLocalStorageResponse<T> {
  const [value, setValue] = useState((): T => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialValue;

    return JSON.parse(storedValue) satisfies T as T;
  });

  useEffect(() => {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const setLocalStorageValue = (value: T): void => {
    setValue(value);
  };

  const removeLocalStorageValue = (): void => {
    setValue(null);
  };

  return [value, setLocalStorageValue, removeLocalStorageValue];
}
