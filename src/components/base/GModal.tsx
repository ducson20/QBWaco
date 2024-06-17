/* eslint-disable */

import { useState, useCallback } from 'react';

import { Modal } from 'native-base';

export interface GModal {
  isShowModal: boolean;
  closeModal: (isShowModal: boolean) => void;
  headerContent: JSX.Element;
  bodyContent: JSX.Element;
  footerContent: JSX.Element;
}

export default function GModal({
  isShowModal,
  closeModal,
  headerContent,
  bodyContent,
  footerContent,
}: GModal) {
  return (
    <Modal isOpen={isShowModal} onClose={closeModal}>
      <Modal.Content minWidth="340" maxWidth="350" bg="white">
        <Modal.CloseButton />
        <Modal.Header
          bg="white"
          borderBottomColor="gray.400"
          _text={{ textAlign: 'center', fontSize: 16, color: 'secondary.600' }}
        >
          {headerContent}
        </Modal.Header>
        <Modal.Body bg="white" _scrollview={{ scrollEnabled: false }}>
          {bodyContent}
        </Modal.Body>
        <Modal.Footer p={1} bg="white" borderTopColor="gray.400">
          {footerContent}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
