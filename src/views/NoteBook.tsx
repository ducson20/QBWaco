/* eslint-disable */

import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch } from '../hooks';

export interface INoteBookProps {}

export default function NoteBook(): JSX.Element {
  const navigation: any = useNavigation();

  return (
    <HStack justifyContent="space-between" space={2} mb={2}>
      <HStack flex={0.5}>
        <Button
          size="md"
          colorScheme="primary"
          w="100%"
          _text={{
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 600,
            color: '#ffffff',
          }}
          onPress={() => navigation.navigate('NoteBookList')}
        >
          <HStack justifyContent="center">
            <Icon as={<MaterialIcons name="storage" />} size={20} color="white" />
          </HStack>
          Tất cả dữ liệu
        </Button>
      </HStack>
      <HStack flex={0.5}>
        <Button
          size="md"
          colorScheme="secondary"
          w="100%"
          _text={{
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 600,
            color: '#ffffff',
          }}
          onPress={() => {
            navigation.navigate('Summarize');
          }}
        >
          <HStack justifyContent="center">
            <Icon as={<MaterialIcons name="description" />} size={20} color="white" />
          </HStack>
          Tổng Hợp
        </Button>
      </HStack>
    </HStack>
  );
}
