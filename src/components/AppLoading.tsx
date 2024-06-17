/* eslint-disable */

import { memo } from 'react';
import { Modal, HStack, VStack, Spinner, Text, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface IAppLoading {
  isShowLoading: boolean;
  message?: string;
}

const AppLoading = ({ isShowLoading, message }: IAppLoading) => {
  return (
    <Modal isOpen={isShowLoading} closeOnOverlayClick={false}>
      {message ? (
        <Modal.Content w={'auto'} px={3} py={8} bg="white">
          <Spinner mb={6} size="lg" color="primary.600" />
          <VStack justifyContent="center" alignItems="center">
            <HStack space={1} alignItems="center">
              <Icon as={<Ionicons name="warning-outline" />} size={5} color="yellow.600" />
              <Text fontSize={12} color="light.700">
                {message}
              </Text>
            </HStack>
            <Text fontSize={12} color="light.700">
              Không thoát ứng dụng.
            </Text>
          </VStack>
        </Modal.Content>
      ) : (
        <Spinner size="lg" color="primary.600" />
      )}
    </Modal>
  );
};

export default memo(AppLoading);
