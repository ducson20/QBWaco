/* eslint-disable */

import { Platform } from 'react-native';
import { VStack, HStack, Heading, Text, Button } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useDatetimePicker } from '../../hooks';
import { formatDateToMM_YYYY } from '../../utils';

export interface IDebtProps {}

export default function Debt(props: IDebtProps) {
  const { selectedDate, isDatePickerVisible, showDatePicker, hideDatePicker, handleConfirm } =
    useDatetimePicker();

  return (
    <VStack w="100%" space={3} flex={1}>
      <VStack space={3} bg="white" borderRadius={8}>
        <HStack p={3} space={3} alignItems="center" justifyContent="center">
          <Text
            flex={0.3}
            p={2}
            fontSize={16}
            color="light.900"
            borderBottomWidth={2}
            borderBottomColor="light.400"
            onPress={showDatePicker}
          >
            {formatDateToMM_YYYY(selectedDate.toString())}
          </Text>
          <Text flex={0.7} fontSize={16} fontWeight="bold" color="light.700">
            lovt0001
          </Text>
        </HStack>
        <HStack px={3} pb={3}>
          <Button w="100%" size="md" colorScheme="primary">
            Tìm Kiếm
          </Button>
        </HStack>
      </VStack>
      <VStack w="100%" mb={4} px={3} py={3} bg="white">
        <Heading fontSize={18} color="secondary.700" mb={2}>
          Lê Văn Quang(Toàn)
        </Heading>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Mã KH:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            LOVT0001
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Tiền cần thu:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            56,000 VNĐ
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Địa chỉ:
          </Text>
          <Text flex={0.6} fontSize={14} color="light.700">
            Thôn Vĩnh Phước Tây, Xã Quảng Lộc, Thị Xã Ba Đồn
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
            Trạng thái:
          </Text>
          <Text flex={0.6} fontSize={14} fontWeight="bold" color="tertiary.600">
            Đã thu
          </Text>
        </HStack>
      </VStack>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </VStack>
  );
}
