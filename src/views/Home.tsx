/* eslint-disable */

import { Box, ScrollView, HStack, VStack, Heading, Text } from 'native-base';
import { PieChart, LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Labels } from './Labels';
export interface IHomeProps {}

export interface IPieChart {
  id: number;
  value: number;
  color: string;
}

const getPieChartDataRounded = (data: IPieChart[]) => {
  return data.map((item, index) => {
    return {
      key: item?.id,
      value: item?.value,
      svg: { fill: item?.color },
      arc: { cornerRadius: 5 },
    };
  });
};
const pieChartDataRounded = getPieChartDataRounded([
  { id: 1, value: 80, color: 'red' },
  { id: 2, value: 20, color: 'yellow' },
]);
const dataGrid = [30000, 5000, 0, 40000, 50000];
const data = [0, 20000, 40000, 60000, 80000, 100000];
const dataDate = [{ date: 20 }, { date: 21 }, { date: 22 }, , { date: 23 }, { date: 24 }];
export default function Home() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <VStack space={4}>
          <VStack
            width="100%"
            space={2}
            px={5}
            py={6}
            bg="white"
            borderRadius={8}
            overflow="hidden"
            shadow={30}
          >
            <HStack>
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Kỳ cước:
              </Text>
              <Text flex={0.6} fontSize={14} color="light.700">
                03/2022
              </Text>
            </HStack>
            <HStack>
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                KH đã thu:
              </Text>
              <Text flex={0.6} fontSize={14} color="light.700">
                38/1872
              </Text>
            </HStack>
            <HStack>
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Tiền đã thu:
              </Text>
              <Text flex={0.6} fontSize={14} color="light.700">
                4,000,000 VNĐ
              </Text>
            </HStack>
          </VStack>
          <VStack
            width="100%"
            space={2}
            px={5}
            py={6}
            bg="white"
            borderRadius={8}
            overflow="hidden"
            shadow={30}
          >
            <Heading textAlign="center" textTransform="uppercase" fontSize={18} color="primary.600">
              Tiền thu theo ngày
            </Heading>
            <HStack h={200}>
              <YAxis
                data={data}
                numberOfTicks={5}
                formatLabel={(value) => `${value} VND`}
                style={{ marginBottom: 10 }}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{ fontSize: 10, fill: 'grey' }}
              />
              <VStack flex={1} ml={2}>
                <LineChart
                  style={{ flex: 1 }}
                  data={dataGrid}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                >
                  <Grid />
                </LineChart>
                <XAxis
                  style={{ marginHorizontal: -10, height: 10 }}
                  data={dataDate}
                  numberOfTicks={5}
                  formatLabel={(value) => `${value}-2`}
                  xAccessor={({ item }: any) => item.date}
                  contentInset={{ left: 10, right: 10 }}
                  svg={{ fontSize: 10, fill: 'grey' }}
                />
              </VStack>
            </HStack>
          </VStack>
          <VStack
            width="100%"
            space={2}
            px={5}
            py={6}
            bg="white"
            borderRadius={8}
            overflow="hidden"
            shadow={30}
          >
            <Heading textAlign="center" textTransform="uppercase" fontSize={18} color="primary.600">
              Tỷ lệ thu
            </Heading>

            <HStack mb={4} justifyContent="center" alignItems="center">
              <HStack mr={4} alignItems="center">
                <Box mr={2} w={3} h={3} bg="#ffff00" borderRadius={6} />
                <Text fontSize={16} fontWeight="bold" color="light.700">
                  Đã thu
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Box mr={2} w={3} h={3} bg="#ff0000" borderRadius={6} />
                <Text fontSize={16} fontWeight="bold" color="light.700">
                  Chưa thu
                </Text>
              </HStack>
            </HStack>
            <HStack justifyContent="center">
              <PieChart
                style={{ width: 300, height: 300 }}
                data={pieChartDataRounded}
                innerRadius={35}
                outerRadius={70}
                labelRadius={120}
                
                sort={(a, b) => b.key - a.key}
              >
                <Labels />
              </PieChart>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}
