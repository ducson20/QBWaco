/* eslint-disable */

import { useState, useCallback } from 'react';

export function useModal() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsShowModal(false);
  }, [isShowModal]);

  const showModal = useCallback(() => {
    setIsShowModal(true);
  }, [isShowModal]);

  return { isShowModal, showModal, closeModal };
}
