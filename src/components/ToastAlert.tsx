/* eslint-disable */

import { memo } from 'react';

import { VStack, HStack, Alert, Text } from 'native-base';

export interface IToastAlertProps {
  title: any | unknown;
  status?: string;
  variant?: string;
}

export const ToastAlert = ({ title, status = 'success', variant }: IToastAlertProps) => {
  return (
    <Alert maxWidth="96%" alignSelf="center" flexDirection="row" status={status} variant={variant}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color="coolGray.800">
              {title}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default memo(ToastAlert);
