/* eslint-disable */

import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity, Keyboard } from 'react-native';
import { Box, VStack, HStack, Text, Button, Input, Icon, FormControl, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PrinterModal } from '../PrinterModal';
import { ToastAlert } from '../ToastAlert';
import { LoadingContext } from '../../contexts';
import {
  getDBConnection,
  updateCSDH_SoGhiChiSo,
  getCSDH_SoGhiChiSoBySoGhiId,
} from '../../services/db-service';
import { useDatetimePicker } from '../../hooks';
import { formatDateToMM_DD_YYYY } from '../../utils';
import type { ICSDH_SoGhiChiSo } from '../../services/db-service';
export interface IWaterNumberProps {}

export interface IEditWaterNumberForm {
  ChiSoGhiDuoc: number;
  NgayGhiThucTe: string;
}

export default function WaterNumberDetail(props: IWaterNumberProps) {
  const route: any = useRoute();
  const { item }: any = route?.params;
  const toast = useToast();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
  } = useDatetimePicker();
  const { isLoadingApp, setIsLoadingApp } = useContext(LoadingContext);

  const [dataItem, setDataItem] = useState<ICSDH_SoGhiChiSo>();
  const [modalInfo, setModalInfo] = useState<any>();

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<IEditWaterNumberForm>({
    defaultValues: {
      ChiSoGhiDuoc: dataItem?.ChiSoGhiDuoc ? dataItem?.ChiSoGhiDuoc : item?.ChiSoGhiDuoc,
      NgayGhiThucTe: formatDateToMM_DD_YYYY(selectedDate.toString()),
    },
  });

  const showModal = useCallback(
    (item: any) => {
      setModalInfo(item);
    },
    [modalInfo]
  );

  const closeModal = useCallback(() => {
    setModalInfo(undefined);
  }, [modalInfo]);

  const onSubmit = async (formData: IEditWaterNumberForm) => {
    setIsLoadingApp(true);
    const req = {
      id: dataItem?.ID,
      ChiSoGhiDuoc: formData?.ChiSoGhiDuoc,
      ChiSoKyTruoc: formData?.ChiSoGhiDuoc,
      NgayGhiThucTe: selectedDate.toString(),
    };

    const db = await getDBConnection();
    await updateCSDH_SoGhiChiSo(db, req);
    setIsLoadingApp(false);
    toast.show({
      render: () => {
        return <ToastAlert title="Cập nhật số ghi chỉ số thành công." />;
      },
      placement: 'top',
      duration: 3000,
    });
    Keyboard.dismiss();
  };

  const formatNgayGhiThucTe = useMemo(() => {
    return formatDateToMM_DD_YYYY(selectedDate.toString());
  }, [selectedDate]);

  const loadData = useCallback(async () => {
    try {
      setIsLoadingApp(true);
      const db = await getDBConnection();
      await getCSDH_SoGhiChiSoBySoGhiId(db, item.ID).then((res) => {
        setValue('ChiSoGhiDuoc', res?.ChiSoGhiDuoc);
        setSelectedDate(
          res?.NgayGhiThucTe !== 'null' ? moment(res?.NgayGhiThucTe).toDate() : moment().toDate()
        );
        setDataItem(res);
        setIsLoadingApp(false);
      });
    } catch (error) {
      setIsLoadingApp(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Box flex={1} px={1} py={2} bg="blue.600">
        {dataItem && !isLoadingApp ? (
          <VStack flex={1} space={4} p={3} bg="white">
            <VStack>
              <HStack alignItems="flex-end">
                <Text fontSize={14} fontWeight="bold" color="light.900">
                  Mã KH - Tên khách hàng
                </Text>
              </HStack>
              <HStack py={2} alignItems="flex-end">
                <Text fontSize={16} fontWeight="bold" color="secondary.700">
                  {dataItem?.MaKH} - {dataItem?.HoTen}
                </Text>
              </HStack>
            </VStack>
            <HStack>
              <VStack flex={0.3}>
                <HStack alignItems="flex-end">
                  <Text fontSize={14} fontWeight="bold" color="light.900">
                    STT
                  </Text>
                </HStack>
                <HStack py={2} alignItems="flex-end">
                  <Text fontSize={15} color="light.700">
                    {dataItem?.STT}
                  </Text>
                </HStack>
              </VStack>
              <VStack flex={0.7}>
                <HStack alignItems="flex-end">
                  <Text fontSize={14} fontWeight="bold" color="light.900">
                    Mã hợp đồng
                  </Text>
                </HStack>
                <HStack py={2} alignItems="flex-end">
                  <Text fontSize={15} color="light.700">
                    {dataItem?.MaHopDong}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <VStack>
              <HStack alignItems="flex-end">
                <Text fontSize={14} fontWeight="bold" color="light.900">
                  Địa chỉ:
                </Text>
              </HStack>
              <HStack py={2} alignItems="flex-end">
                <Text fontSize={15} color="light.700">
                  {dataItem?.DiaChi}
                </Text>
              </HStack>
            </VStack>
            <HStack mt={2}>
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Seri đồng hồ:
              </Text>
              <Text flex={0.6} fontSize={15} color="light.700">
                {dataItem?.MaDongHo}
              </Text>
            </HStack>
            <HStack mt={2}>
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Chỉ số kỳ trước:
              </Text>
              <Text flex={0.6} fontSize={15} color="light.700">
                {dataItem?.ChiSoKyTruoc}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Ghi được:
              </Text>
              <FormControl flex={0.6}>
                <Controller
                  name="ChiSoGhiDuoc"
                  rules={{
                    required: 'Chỉ số kỳ trước là bắt buộc',
                    validate: {
                      compareWaterNumber: (v: number) =>
                        v > Number(dataItem?.ChiSoKyTruoc) ||
                        'Chỉ ghi được phải lớn hơn chỉ số kỳ trước',
                    },
                  }}
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input
                      fontSize={15}
                      variant="underlined"
                      color="light.700"
                      _focus={{ color: 'light.700', borderBottomColor: 'light.700' }}
                      placeholder="Input number"
                      onChangeText={(value) => {
                        onChange(value);
                      }}
                      onBlur={onBlur}
                      value={String(value)}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors?.ChiSoGhiDuoc && (
                  <HStack alignItems="center" mt={1}>
                    <Icon
                      as={<Ionicons name="alert-circle-outline" />}
                      size={4}
                      mr={1}
                      color="rgb(239, 68, 68)"
                    />
                    <Text fontSize={12} fontWeight={600} color="rgb(239, 68, 68)">
                      {errors?.ChiSoGhiDuoc.message}
                    </Text>
                  </HStack>
                )}
              </FormControl>
            </HStack>

            <HStack alignItems="center">
              <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                Ngày ghi thực tế
              </Text>
              <TouchableOpacity style={{ flex: 0.6 }} onPress={showDatePicker}>
                <FormControl>
                  <Controller
                    name="NgayGhiThucTe"
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => {
                      return (
                        <Input
                          fontSize={15}
                          variant="underlined"
                          color="light.700"
                          _focus={{ color: 'light.700', borderBottomColor: 'light.700' }}
                          showSoftInputOnFocus={false}
                          value={formatNgayGhiThucTe}
                          isReadOnly
                        />
                      );
                    }}
                  />
                </FormControl>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </HStack>
            <HStack mt={12} justifyContent="space-between" alignItems="center">
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
                onPress={showModal}
              >
                In giấy báo
              </Button>
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
              >
                In biên nhận
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
                onPress={handleSubmit(onSubmit)}
              >
                Cập nhật
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Box flex={1} px={1} py={2} bg="blue.600" />
        )}
        <PrinterModal modalInfo={modalInfo} closeModal={closeModal} />
      </Box>
    </>
  );
}
