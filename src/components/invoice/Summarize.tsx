/* eslint-disable */

import React from 'react';
import { VStack, HStack, Heading, Text, Divider } from 'native-base';

export interface ISummarizeProps {}

export default function Summarize(props: ISummarizeProps) {
  return (
    <VStack w="100%" space={3} bg="white" flex={1}>
      <Heading
        pt={3}
        pl={3}
        textAlign="left"
        textTransform="uppercase"
        fontSize={18}
        color="secondary.600"
      >
        Tổng hợp
      </Heading>
      <Divider mb={3} thickness={1} bg="gray.400" />
      <VStack space={3} w="100%" mb={4} px={6} py={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Kỳ cước:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            03/2022
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Khách hành thu cước:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            1827
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Khách hành đã thu:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            38
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Khách hành chưa thu:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            1788
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Tổng tiền:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            294,166,800 VNĐ
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Tiền đã thu:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            3,781,000 VNĐ
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text flex={0.5} fontSize={14} fontWeight="bold" color="light.900">
            Tiền chưa thu:
          </Text>
          <Text flex={0.5} fontSize={14} color="light.700">
            288,725,800 VNĐ
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
