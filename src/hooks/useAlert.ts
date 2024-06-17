/* eslint-disable */

import { useState, useCallback } from 'react';

export function useAlert() {
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const closeAlert = useCallback(() => {
    setIsShowAlert(false);
  }, [isShowAlert]);

  const showAlert = useCallback(() => {
    setIsShowAlert(true);
  }, [isShowAlert]);

  return { isShowAlert, setIsShowAlert, showAlert, closeAlert };
}
