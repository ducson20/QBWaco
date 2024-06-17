/* eslint-disable */

import { Center, Text } from 'native-base';
import { Image } from 'react-native';
export interface INoDataProps {}

export default function NoData(props: INoDataProps) {
  return (
    <Center flex={1}>
      <Image source={require('../assets/images/no-data.png')} style={{ width: 80, height: 80 }} />
      <Text mt={4} fontSize={20} color="light.500">
        No Data
      </Text>
    </Center>
  );
}
