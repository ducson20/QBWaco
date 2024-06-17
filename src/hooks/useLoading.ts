/* eslint-disable */

import { useState } from 'react';

export function useLoading() {
  const [isLoadingApp, setIsLoadingApp] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return { isLoadingApp, setIsLoadingApp, message, setMessage };
}
