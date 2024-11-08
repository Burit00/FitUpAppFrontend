import { useEffect, useState } from 'react';

type DebounceValue<T> = T;

type UseDebounceStateResponse<T> = [DebounceValue<T>, React.Dispatch<React.SetStateAction<T>>];

export function useDebounceState<T>(value: T | (() => T), delay: number = 300): UseDebounceStateResponse<T> {
  const [currentValue, setCurrentValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [currentValue, delay]);

  return [debouncedValue, setCurrentValue];
}
