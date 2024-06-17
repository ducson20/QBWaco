/* eslint-disable */

import { useState, useCallback } from 'react';

import { useDebounce } from 'usehooks-ts';

export function useSearch() {
  const [searchTextVal, setSearchTextVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(searchTextVal, 500);

  // const changeSearchInput = useCallback(
  //   (value: string) => {
  //     setIsLoading(true);
  //     setSearchTextVal(value);
  //   },
  //   [searchTextVal, isLoading]
  // );

  return { searchTextVal, setSearchTextVal, debouncedValue, isLoading, setIsLoading };
}
