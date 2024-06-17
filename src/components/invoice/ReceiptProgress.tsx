/* eslint-disable */

import { useState, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Box, VStack, HStack, FlatList, Heading, Text, Spinner } from 'native-base';
export interface IReceiptProps {}

export interface IReceiptsProgressData {
  id: number;
  LoTrinh: string;
  SoLuongHopDong: number;
  TongTien: string;
}

const receiptsProgressData = [
  {
    id: 1,
    LoTrinh: '01/2022 - Tuyến Quảng Hòa - Hồ Đắc Phúc',
    SoLuongHopDong: 23,
    TongTien: '2,300,000 VNĐ',
  },
  {
    id: 2,
    LoTrinh: '01/2022 - Tuyến Quảng Trung - Phúc',
    SoLuongHopDong: 30,
    TongTien: '4,320,000 VNĐ',
  },
  {
    id: 3,
    LoTrinh: '01/2022 - Tuyến Quảng Văn - Phúc',
    SoLuongHopDong: 43,
    TongTien: '532,000 VNĐ',
  },
  {
    id: 4,
    LoTrinh: '01/2022 - Tuyến Quảng Hòa - Phúc',
    SoLuongHopDong: 57,
    TongTien: '400,000 VNĐ',
  },
];

export default function Receipt(props: IReceiptProps) {
  const navigation: any = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<IReceiptsProgressData[]>(receiptsProgressData);
  const [isListEnd, setIsListEnd] = useState<boolean>(false);

  const getData = () => {
    if (!isLoading && !isListEnd) {
      setIsLoading(true);

      setTimeout(() => {
        setDataSource([...dataSource]);
        setIsLoading(false);
        setIsListEnd(true);
      }, 100);
    }
  };

  return (
    <>
      <Box flex={1} px={1} pt={2} bg="blue.600">
        <FlatList
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={1}
          data={dataSource}
          keyExtractor={(item) => String(item?.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Receipt')}>
              <ReceiptItem item={item} />
            </TouchableOpacity>
          )}
          ListFooterComponent={isLoading ? <Spinner color="gray.500" /> : null}
          onEndReached={getData}
          style={{ flex: 1 }}
        />
      </Box>
    </>
  );
}

export interface IReceiptProgressItem {
  item: IReceiptsProgressData;
}

export const ReceiptItem = memo(({ item }: IReceiptProgressItem) => {
  return (
    <VStack w="100%" mb={4} px={2} py={2} bg="white">
      <Heading fontSize={18} color="secondary.700" mb={2}>
        {item?.LoTrinh}
      </Heading>
      <VStack flex={2} space={2}>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Số lượng HĐ:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            {item?.SoLuongHopDong}
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Tổng tiền:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            {item?.TongTien}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize={16} fontStyle="italic" color="light.900">
            * Đã thu chưa nộp tiền
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Số lượng HĐ:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            {item?.SoLuongHopDong}
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Tổng tiền:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            {item?.TongTien}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
});
