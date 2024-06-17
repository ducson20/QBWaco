/* eslint-disable */

import { useRef, memo } from 'react';

import { HStack, AlertDialog, Text, Button } from 'native-base';

export interface IAlertProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
}

export const Alert = ({ message, isOpen, onClose, onOk }: IAlertProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Body bg="white">
          <Text mb={3} fontWeight="bold" fontSize={16} color="light.900">
            Thông báo
          </Text>
          <Text ml={2} mb={4} fontSize={14} color="light.900">
            {message}
          </Text>
          <HStack w="100%" justifyContent="flex-end">
            <Button
              ref={cancelRef}
              variant="unstyled"
              colorScheme="secondary"
              _text={{
                textTransform: 'uppercase',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'secondary.600',
              }}
              onPress={onClose}
            >
              Đóng
            </Button>
            <Button
              ref={cancelRef}
              variant="unstyled"
              colorScheme="secondary"
              _text={{
                textTransform: 'uppercase',
                fontSize: 14,
                fontWeight: 'bold',
                color: 'secondary.600',
              }}
              onPress={onOk}
            >
              OK
            </Button>
          </HStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default memo(Alert);
