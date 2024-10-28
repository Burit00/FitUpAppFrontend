import { useSearchParams as _useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type KeyValueArray = [string, string];
type CreateQueryStringCallback = (...keyValueArray: KeyValueArray[]) => string;

type TUseSearchParams = {
  searchParams: Readonly<URLSearchParams>;
  createQueryString: CreateQueryStringCallback;
};

export function useSearchParams(): TUseSearchParams {
  const searchParams = _useSearchParams();

  const createQueryString: CreateQueryStringCallback = useCallback(
    (...keyValueArray: KeyValueArray[]): string => {
      const queryString = new URLSearchParams(searchParams.toString());

      keyValueArray.forEach(([key, value]) => {
        queryString.set(key, value);
      });

      return queryString.toString();
    },
    [searchParams],
  );

  return { searchParams, createQueryString };
}
