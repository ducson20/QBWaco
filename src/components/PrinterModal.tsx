/* eslint-disable */

import { useState, useEffect, memo, useContext, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Modal,
  Select,
  CheckIcon,
  Image,
  Icon,
} from 'native-base';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import { LoadingContext } from '../contexts';
import { BLEPrinter } from 'react-native-thermal-receipt-printer-image-qr';
import ViewShot from 'react-native-view-shot';

export interface IPrinterModal {
  modalInfo: any | undefined;
  closeModal: () => void;
}

export interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}

export const PrinterModal = memo(({ modalInfo, closeModal }: IPrinterModal) => {
  const ref = useRef<any>();

  const { setIsLoadingApp } = useContext(LoadingContext);

  const [printers, setPrinters] = useState<IBLEPrinter[]>([]);
  const [currentPrinter, setCurrentPrinter] = useState<IBLEPrinter | undefined>();
  const [modalInfo1, setModalInfo1] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<{ printer: string }>({
    defaultValues: {
      printer: '',
    },
  });
  const onSubmit = async (formData: { printer: string }) => {
    setModalInfo1(true);
    closeModal();
  };

  const connectPrinter = (innerMacAddress: string) => {
    setIsLoadingApp(true);
    BLEPrinter.connectPrinter(innerMacAddress)
      .then((res) => {
        setCurrentPrinter(res);
        setIsLoadingApp(false);
      })
      .catch((err) => {
        setIsLoadingApp(false);
      });
  };

  const printBillTest = () => {
    ref.current.capture().then((uri: any) => {
      console.log(uri)
      BLEPrinter.printImageBase64(uri, {
        imageWidth: 350,
      });
    });
  };

  useEffect(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
        : PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
    ).then((result) => {
    });
    BLEPrinter.init().then(() => {
      BLEPrinter.getDeviceList().then((res) => {
        setPrinters(res);
      });
    });
  }, []);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={modalInfo !== undefined}
        onClose={() => {
          clearErrors();
          closeModal();
        }}
      >
        <Modal.Content minWidth="340" maxWidth="350" bg="white">
          <Modal.CloseButton />
          <Modal.Header
            bg="white"
            borderBottomColor="gray.400"
            _text={{ textAlign: 'center', fontSize: 16, color: 'secondary.600' }}
          >
            Chọn thiết bị
          </Modal.Header>
          <Modal.Body bg="white">
            <VStack w="100%" alignItems="flex-start">
              <Controller
                name="printer"
                control={control}
                rules={{
                  required: 'Lựa chọn một thiết bị',
                }}
                render={({ field: { onChange } }) => {
                  return (
                    <Select
                      variant="underlined"
                      minWidth="100%"
                      accessibilityLabel="Select device"
                      placeholder="Select device"
                      _selectedItem={{
                        bg: 'teal.600',
                        endIcon: <CheckIcon size={3} />,
                      }}
                      mt="1"
                      color="light.700"
                      borderBottomColor="light.700"
                      onValueChange={(innerMacAddress) => {
                        onChange(innerMacAddress);
                        connectPrinter(innerMacAddress);
                      }}
                    >
                      {printers.map((printer: IBLEPrinter) => (
                        <Select.Item
                          key={printer.inner_mac_address}
                          label={printer.device_name}
                          value={printer.inner_mac_address}
                        />
                      ))}
                    </Select>
                  );
                }}
              />
              {errors?.printer && (
                <HStack alignItems="center" mt={1}>
                  <Icon
                    as={<Ionicons name="alert-circle-outline" />}
                    size={4}
                    mr={1}
                    color="rgb(239, 68, 68)"
                  />
                  <Text fontSize={12} fontWeight={600} color="rgb(239, 68, 68)">
                    {errors?.printer.message}
                  </Text>
                </HStack>
              )}
            </VStack>
            <HStack space={3} mt={6} justifyContent="flex-end">
              <Button
                variant="unstyled"
                colorScheme="secondary"
                _text={{
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'secondary.600',
                }}
                onPress={handleSubmit(onSubmit)}
              >
                OK
              </Button>
              <Button
                variant="unstyled"
                colorScheme="secondary"
                _text={{
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'secondary.600',
                }}
                onPress={() => {
                  clearErrors();
                  closeModal();
                }}
              >
                Đóng
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={modalInfo1}
        onClose={() => {
          setModalInfo1(false);
          setValue('printer', '');
        }}
      >
        <Modal.Content minWidth="340" maxWidth="350" bg="white">
          <Modal.CloseButton />
          <Modal.Header
            bg="white"
            borderBottomColor="gray.400"
            _text={{ textAlign: 'center', fontSize: 16, color: 'secondary.600' }}
          >
            In giấy báo
          </Modal.Header>
          <Modal.Body bg="white">
            <VStack px={8} flex={1} space={2}>
              <ViewShot
                style={{ backgroundColor: 'white' }}
                ref={ref}
                options={{
                  fileName: 'Your-File-Name',
                  format: 'jpg',
                  quality: 1,
                  result: 'base64',
                  width: 200,
                }}
              >
                <VStack>
                  <HStack w="100%" space={1} alignItems="flex-start">
                    <VStack w="26%" justifyContent="center" alignItems="center">
                      <Image
                        source={{
                          uri: 'http://capnuocquangbinh.vn/Content/image/logo.png',
                        }}
                        alt="Alternate Text"
                        size={50}
                        borderRadius={25}
                      />
                    </VStack>
                    <Box w="74%">
                      <Text fontSize={11} color="light.700">
                        SỞ NÔNG NGHIỆP & PTNT QUẢNG BÌNH
                      </Text>
                      <Text fontSize={11} fontWeight="bold" color="light.700">
                        TRUNG TÂM NƯỚC SẠCH & VSMT NÔNG THÔI
                      </Text>
                    </Box>
                  </HStack>
                  <VStack flex={1}>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Trạm cấp nước:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        P Đồng Hải - Thanh Niên(Sơn)
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Mã trạm:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        02.05.001
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Điện thoại báo sự cố:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        088.952.7373
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Hoặc điện thoại quản lý trạm:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        0912.190.936
                      </Text>
                    </HStack>
                  </VStack>
                  <HStack flex={1} justifyContent="center" mt={3}>
                    <Text fontSize={16} fontWeight="bold" color="light.700">
                      Giấy báo tiền nước (lần 2)
                    </Text>
                  </HStack>
                  <VStack alignItems="center" justifyContent="center" mt={3}>
                    <Text fontSize={10} color="light.700">
                      Ngày 26 tháng 02 năm 2023
                    </Text>
                    <Text fontSize={10} color="light.700">
                      Kỳ 01 năm 2023
                    </Text>
                  </VStack>
                  <VStack mt={2}>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Mã số KH:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        02.05.001.0230
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Tên KH:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        Lê Đức Chánh
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        Địa chỉ:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700">
                        P Đồng Hải - Thanh Niên
                      </Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        MST KH:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700"></Text>
                    </HStack>
                    <HStack space={1}>
                      <Text fontSize={10} color="light.700">
                        ĐT KH:
                      </Text>
                      <Text fontSize={10} fontWeight="bold" color="light.700"></Text>
                    </HStack>
                  </VStack>

                  <VStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderColor="light.700"
                      >
                        Chỉ số mới
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        342,3
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        Chỉ số cũ:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        442,3
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        M3 tiêu thụ:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        9
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        M3 truy thu:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        0
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        M3 giảm trừ:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        3
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        M3 thanh toán:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={12}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        6
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        {`Tiền phí\nBVMT(180đ/m2):`}
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={14}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        1.080
                      </Text>
                    </HStack>
                    <HStack>
                      <Text
                        flex={0.5}
                        fontSize={12}
                        color="light.700"
                        borderWidth={1}
                        borderRightWidth={0}
                        borderTopWidth={0}
                        borderColor="light.700"
                      >
                        Tiền thanh toán:
                      </Text>
                      <Text
                        flex={0.5}
                        textAlign="center"
                        fontSize={14}
                        fontWeight="bold"
                        color="light.700"
                        borderTopWidth={0}
                        borderWidth={1}
                        borderColor="light.700"
                      >
                        24.000 đ
                      </Text>
                    </HStack>
                  </VStack>
                  <VStack space={2}>
                    <Text fontSize={12} fontStyle="italic" color="light.700">
                      Bằng chữ: hai mươi bốn ngàn đồng.
                    </Text>
                    <VStack>
                      <Text fontSize={10} color="light.700">
                        Hình thức thanh toán: Tiền mặt
                      </Text>
                      <Text fontSize={10} color="light.700">
                        Nhân viên thu tiền: Lê Văn Khả Ly - NV0126
                      </Text>
                      <Text fontSize={10} color="light.700">
                        Số ĐT: 0889527373
                      </Text>
                    </VStack>
                    <VStack>
                      <Text fontSize={10} color="light.700">
                        {`Quý khách hàng truy cập Website:\nhttps://trungtamcapnuocquanbinh.vnpt -\ninvoice.com.vn để tra cứu hóa đơn điện tử\n(tiền nước GTGT). Sau khi đã thanh toán tiền nước`}
                      </Text>
                    </VStack>
                    <VStack>
                      <Text fontSize={10} color="light.700">
                        Thông tin truy cập: Mã số KH, mật khẩu truy cập lần đầu là: 123456. Hoặc gọi
                        số(02923.890905) để được hướng dẫn.
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>
              </ViewShot>
            </VStack>
          </Modal.Body>
          <Modal.Footer bg="white" borderTopColor="gray.400">
            <HStack space={2} justifyContent="flex-end">
              <Button
                variant="unstyled"
                colorScheme="secondary"
                _text={{
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'secondary.600',
                }}
                onPress={printBillTest}
              >
                In Giấy Báo
              </Button>
              <Button
                variant="unstyled"
                colorScheme="secondary"
                _text={{
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'secondary.600',
                }}
                onPress={() => {
                  setModalInfo1(false);
                  setValue('printer', '');
                }}
              >
                Đóng
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
});
