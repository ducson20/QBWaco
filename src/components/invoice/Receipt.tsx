/* eslint-disable */

import { useState, memo, useCallback } from 'react';
import { Box, VStack, HStack, FlatList, Heading, Text, Button, Spinner } from 'native-base';

import { PrinterModal } from '../PrinterModal';
import Alert from '../AlertDialog';
import { useAlert } from '../../hooks';
import { ICSDH_HoaDon } from '../../services/db-service';

export interface IReceiptProps {}

interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}

const receiptsData = [
  {
    id: 1,
    ten_kh: 'Lê Văn Quang(Toàn)',
    sm_daidien: 'LOVT0001',
    tong_cong: '40,000 VNĐ',
    diachi_kh: `Thôn Vĩnh Phước Tây,${'\n'}Xã Quảng Lộc, TX Ba Đồn`,
    status: true,
  },
  {
    id: 2,
    ten_kh: 'Lê Đức Sơn',
    sm_daidien: 'LOVT0002',
    tong_cong: '30,000 VNĐ',
    diachi_kh: `63 Thanh Niên,${'\n'}Phường Đồng Hải, TP Đồng Hới`,
    status: false,
  },
  {
    id: 3,
    ten_kh: 'Nguyễn Trường Phúc',
    sm_daidien: 'LOVT0003',
    tong_cong: '100,000 VNĐ',
    diachi_kh: `124 Đoàn Khuê,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
    status: false,
  },
  {
    id: 4,
    ten_kh: 'Nguyễn Xuân Nghiệp',
    sm_daidien: 'LOVT0004',
    tong_cong: '20,000 VNĐ',
    diachi_kh: `100 Ngủ Hành Sơn,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
    status: true,
  },
  {
    id: 5,
    ten_kh: 'Lê Văn Quang(Toàn)',
    sm_daidien: 'LOVT0001',
    tong_cong: '40,000 VNĐ',
    diachi_kh: `Thôn Vĩnh Phước Tây,${'\n'}Xã Quảng Lộc, TX Ba Đồn`,
    status: true,
  },
  {
    id: 6,
    ten_kh: 'Lê Đức Sơn',
    sm_daidien: 'LOVT0002',
    tong_cong: '30,000 VNĐ',
    diachi_kh: `63 Thanh Niên,${'\n'}Phường Đồng Hải, TP Đồng Hới`,
    status: false,
  },
  {
    id: 7,
    ten_kh: 'Nguyễn Trường Phúc',
    sm_daidien: 'LOVT0003',
    tong_cong: '100,000 VNĐ',
    diachi_kh: `124 Đoàn Khuê,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
    status: false,
  },
  {
    id: 8,
    ten_kh: 'Nguyễn Xuân Nghiệp',
    sm_daidien: 'LOVT0004',
    tong_cong: '20,000 VNĐ',
    diachi_kh: `100 Ngủ Hành Sơn,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
    status: true,
  },
];

export default function Receipt(props: IReceiptProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ICSDH_HoaDon[]>(receiptsData);
  const [isListEnd, setIsListEnd] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ICSDH_HoaDon | undefined>();

  const { isShowAlert, showAlert, closeAlert } = useAlert();

  const onOk = () => {
    closeAlert();
  };

  const showModal = useCallback(
    (item: ICSDH_HoaDon) => {
      setModalInfo(item);
    },
    [modalInfo]
  );

  const closeModal = useCallback(() => {
    setModalInfo(undefined);
  }, [modalInfo]);

  const getData = () => {
    if (!isLoading && !isListEnd) {
      setIsLoading(true);

      setTimeout(() => {
        setDataSource([
          ...dataSource,
          ...[
            {
              id: 9,
              ten_kh: 'Trương Khánh Toàn',
              sm_daidien: 'LOVT0004',
              tong_cong: '20,000 VNĐ',
              diachi_kh: `100 Ngủ Hành Sơn,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
              status: true,
            },
            {
              id: 10,
              ten_kh: 'Nguyễn Quang Hùng',
              sm_daidien: 'LOVT0004',
              tong_cong: '20,000 VNĐ',
              diachi_kh: `100 Ngủ Hành Sơn,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`,
              status: true,
            },
          ],
        ]);
        setIsLoading(false);
        setIsListEnd(true);
      }, 100);
    }
  };

  return (
    <>
      <Box px={1} pt={2} bg="blue.600">
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
            <ReceiptItem item={item} showAlert={showAlert} showModal={() => showModal(item)} />
          )}
          ListFooterComponent={isLoading ? <Spinner color="gray.500" /> : null}
          onEndReached={getData}
          style={{ width: '100%' }}
        />
        <Alert
          message="Bạn muốn gạch nợ cho khách hàng này?"
          isOpen={isShowAlert}
          onClose={closeAlert}
          onOk={onOk}
        />
        <PrinterModal modalInfo={modalInfo} closeModal={closeModal} />
      </Box>
    </>
  );
}

export interface IReceiptItem {
  item: ICSDH_HoaDon;
  showAlert?: () => void;
  showModal?: () => void;
}

export const ReceiptItem = memo(({ item, showAlert, showModal }: IReceiptItem) => {
  return (
    <VStack w="100%" mb={4} px={2} py={2} bg="white">
      <Heading fontSize={18} color="secondary.700" mb={2}>
        {item?.ten_kh}
      </Heading>
      <HStack flex={1} space={2} justifyContent="space-between" alignItems="center">
        <VStack flex={2} space={2}>
          <HStack>
            <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
              Mã KH:
            </Text>
            <Text flex={0.6} fontSize={14} color="light.700">
              {item?.sm_daidien}
            </Text>
          </HStack>
          <HStack>
            <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
              Tiền cần thu:
            </Text>
            <Text flex={0.6} fontSize={14} color="light.700">
              {item?.thang_cuoc}
            </Text>
          </HStack>
          <HStack>
            <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
              Địa chỉ:
            </Text>
            <Text flex={0.6} fontSize={14} color="light.700">
              {item?.diachi_kh}
            </Text>
          </HStack>
          <HStack>
            <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
              Trạng thái:
            </Text>
            <Text
              flex={0.6}
              fontSize={14}
              fontWeight="bold"
              color={item?.status ? 'tertiary.600' : 'danger.600'}
            >
              {item?.status ? 'Đã thu' : 'Chưa thu'}
            </Text>
          </HStack>
        </VStack>
        <HStack flex={1} justifyContent="center" alignItems="center">
          <VStack space={2}>
            <Button
              size="md"
              colorScheme="secondary"
              _text={{
                color: '#ffffff',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
              }}
              onPress={showAlert}
            >
              Hủy thu
            </Button>
            <Button
              size="md"
              colorScheme="primary"
              _text={{
                color: '#ffffff',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
              }}
              onPress={showModal}
            >
              In hóa đơn
            </Button>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
});
