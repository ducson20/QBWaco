/* eslint-disable */

import { useState, useEffect, useCallback, useContext, useMemo, memo } from 'react';
import { TouchableOpacity, VirtualizedList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Spinner,
  Modal,
  FormControl,
  useToast,
} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useForm, Controller } from 'react-hook-form';
import delay from 'delay';

import { ToastAlert } from '../ToastAlert';
import { PAGINATION } from '../../constants';
import { LoadingContext } from '../../contexts';
import { useDatetimePicker, useAppSelector } from '../../hooks';
import { searchTextValSelector } from '../../store/selectors';
import {
  getDBConnection,
  getCSDH_SoGhiChiSoList,
  updateCSDH_SoGhiChiSo,
  getCSDH_SoGhiChiSoListByName,
} from '../../services/db-service';
import type { ICSDH_SoGhiChiSo } from '../../services/db-service';
import { formatDateToMM_DD_YYYY } from '../../utils';

export interface IWaterNumberProps {}

export interface IEditWaterNumberForm {
  ChiSoGhiDuoc: number;
  NgayGhiThucTe: string;
}

export default function WaterNumber(props: IWaterNumberProps) {
  const route: any = useRoute();
  const toast = useToast();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
  } = useDatetimePicker();

  const { setIsLoadingApp } = useContext(LoadingContext);

  const searchTextVal = useAppSelector(searchTextValSelector);

  const [modalInfo, setModalInfo] = useState<ICSDH_SoGhiChiSo | undefined>();
  const [currentPage, setCurrentPage] = useState(3);
  const [dataTemp, setDataTemp] = useState<ICSDH_SoGhiChiSo[]>([]);
  const [dataSource, setDataSource] = useState<ICSDH_SoGhiChiSo[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IEditWaterNumberForm>({
    defaultValues: {
      ChiSoGhiDuoc: modalInfo?.ChiSoGhiDuoc,
      NgayGhiThucTe: formatDateToMM_DD_YYYY(selectedDate.toString()),
    },
  });

  const onSubmit = async (formData: IEditWaterNumberForm) => {
    setIsLoadingApp(true);
    const req = {
      id: modalInfo?.ID,
      ChiSoGhiDuoc: formData?.ChiSoGhiDuoc,
      ChiSoKyTruoc: formData?.ChiSoGhiDuoc,
      NgayGhiThucTe: selectedDate.toString(),
    };

    const db = await getDBConnection();
    await updateCSDH_SoGhiChiSo(db, req);
    setIsLoadingApp(false);

    toast.show({
      render: () => {
        return <ToastAlert title="Cập nhật số ghi chỉ số thành công" />;
      },
      placement: 'top',
      duration: 3000,
    });

    const updateListItems = dataSource?.map((item) => {
      if (item?.ID === modalInfo?.ID) {
        return {
          ...item,
          ChiSoGhiDuoc: getValues('ChiSoGhiDuoc'),
          ChiSoKyTruoc: getValues('ChiSoGhiDuoc'),
          TrangThai: '1',
          NgayGhiThucTe: selectedDate.toString(),
        };
      } else {
        return { ...item };
      }
    });

    setDataSource(updateListItems);

    for (let i = 0; i < updateListItems.length; i++) {
      if (updateListItems[i].ID === modalInfo?.ID) {
        setSelectedDate(new Date(updateListItems[i].NgayGhiThucTe));
      } else {
        setSelectedDate(new Date());
      }
    }
    setModalInfo(undefined);
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGINATION.pageSize;
    const lastPageIndex = firstPageIndex + PAGINATION.pageSize;
    return dataTemp.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataTemp]);

  const loadMoreResults = async () => {
    if (loadingMore || allLoaded) {
      return;
    } else {
      if (currentData.length === 0) {
        setAllLoaded(true);
      } else {
        setCurrentPage(currentPage + 1);
        setLoadingMore(true);
        await delay(3000);
        setDataSource((prev) => [...prev, ...currentData]);

        setLoadingMore(false);
      }
    }
  };

  const closeModal = useCallback(() => {
    setModalInfo(undefined);
    setSelectedDate(new Date());
    clearErrors(['ChiSoGhiDuoc']);
  }, []);

  const showModal = useCallback((item: ICSDH_SoGhiChiSo) => {
    setModalInfo(item);
    setValue('ChiSoGhiDuoc', item?.ChiSoGhiDuoc);
    setValue('NgayGhiThucTe', item?.NgayGhiThucTe);
    if (item?.NgayGhiThucTe === 'null') {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(new Date(item?.NgayGhiThucTe));
    }
  }, []);

  const formatNgayGhiThucTe = useMemo(() => {
    return formatDateToMM_DD_YYYY(selectedDate.toString());
  }, [selectedDate]);

  const renderItems = useCallback(
    ({ item }: any) => <WaterNumberItem key={item.ID} item={item} />,
    []
  );

  const loadData = useCallback(async () => {
    try {
      setIsLoadingApp(true);
      const db = await getDBConnection();
      await getCSDH_SoGhiChiSoList(db, route?.params?.id).then((res) => {
        if (res[0]?.ID) {
          setDataTemp(res);
          setDataSource(res.slice(0, 20));
          setIsLoadingApp(false);
        } else {
          setIsLoadingApp(false);
        }
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadDataSearch = useCallback(async () => {
    if (searchTextVal) {
      try {
        setIsLoadingApp(true);
        const db = await getDBConnection();
        await getCSDH_SoGhiChiSoListByName(db, searchTextVal).then((res) => {
          setDataTemp(res);
          setDataSource(res.slice(0, 20));
          setIsLoadingApp(false);
        });
      } catch (error) {
        console.error('Error: ', error);
      }
    } else {
      loadData();
    }
  }, [searchTextVal]);

  useEffect(() => {
    loadDataSearch();
  }, [searchTextVal]);

  return (
    <Box flex={1} px={1} pt={2} bg="blue.600">
      <VirtualizedList
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={20}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={250}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={dataSource}
        keyExtractor={keyExtractor}
        getItemLayout={(data, index) => ({
          length: dataSource.length,
          offset: dataSource.length * index,
          index,
        })}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={renderItems}
        ListFooterComponent={loadingMore ? <Spinner color="gray.500" /> : null}
        onEndReached={loadMoreResults}
        style={{ flex: 1 }}
      />
      {/* <Modal isOpen={modalInfo !== undefined} onClose={closeModal}>
        <Modal.Content minWidth="340" maxWidth="350" bg="white">
          <Modal.CloseButton />
          <Modal.Header
            bg="white"
            borderBottomColor="gray.400"
            _text={{ textAlign: 'center', fontSize: 16, color: 'secondary.600' }}
          >
            Ghi chỉ số nước
          </Modal.Header>
          <Modal.Body bg="white" _scrollview={{ scrollEnabled: false }}>
            <VStack flex={1} space={2}>
              <HStack alignItems="flex-end">
                <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                  Họ và tên:
                </Text>
                <Text flex={0.6} fontSize={16} fontWeight="bold" color="secondary.700">
                  {modalInfo?.HoTen}
                </Text>
              </HStack>
              <HStack>
                <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                  Mã hợp đồng:
                </Text>
                <Text flex={0.6} fontSize={14} color="light.700">
                  {modalInfo?.MaHopDong}
                </Text>
              </HStack>
              <HStack>
                <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                  Địa chỉ:
                </Text>
                <Text flex={0.6} fontSize={14} color="light.700">
                  {modalInfo?.DiaChi}
                </Text>
              </HStack>
              <HStack mt={2}>
                <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
                  Chỉ số kỳ trước:
                </Text>
                <Text flex={0.6} fontSize={14} color="light.700">
                  {modalInfo?.ChiSoKyTruoc}
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
                          v > Number(modalInfo?.ChiSoKyTruoc) ||
                          'Chỉ ghi được phải lớn hơn chỉ số kỳ trước',
                      },
                    }}
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <Input
                        fontSize={14}
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
                      render={({ field: { value } }) => {
                        return (
                          <Input
                            fontSize={14}
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
              <HStack space={3} mt={6} justifyContent="flex-end">
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
                  onPress={() => closeModal()}
                >
                  Đóng
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal> */}
    </Box>
  );
}

const keyExtractor = (item: ICSDH_SoGhiChiSo) => String(item.ID);
const getItemCount = (data: ICSDH_SoGhiChiSo[]) => data.length;
const getItem = (data: ICSDH_SoGhiChiSo[], index: number) => data[index];

export interface IWaterNumberItem {
  item: ICSDH_SoGhiChiSo;
  showModal?: () => void;
}

export const WaterNumberItem = memo(({ item, showModal }: IWaterNumberItem) => {
  return (
    <VStack flex={1} w="100%" mb={4} px={2} py={2} bg="white">
      <Heading fontSize={18} color="secondary.700" mb={2}>
        {item?.HoTen}
      </Heading>
      <VStack flex={1} space={2}>
        <HStack>
          <HStack flex={0.5}>
            <Text flex={0.6} fontSize={14} fontWeight="bold" color="light.900">
              Mã KH:
            </Text>
            <Text flex={0.4} fontSize={14} color="secondary.700">
              {item?.KhachHangID}
            </Text>
          </HStack>
          <HStack flex={0.5}>
            <Text flex={0.6} fontSize={14} fontWeight="bold" color="light.900">
              Mã hợp đồng:
            </Text>
            <Text flex={0.4} fontSize={14} color="light.700">
              {item.MaHopDong}
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Địa chỉ:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {item?.DiaChi ? item?.DiaChi : `100 Ngủ Hành Sơn,${'\n'}Phường Khuê Mỹ, TP Đà Nẵng`}
          </Text>
        </HStack>
        <HStack>
          <HStack flex={0.5}>
            <Text flex={0.6} fontSize={14} fontWeight="bold" color="light.900">
              Chỉ số kỳ trước:
            </Text>
            <Text flex={0.4} fontSize={14} color="secondary.700">
              {item?.ChiSoKyTruoc}
            </Text>
          </HStack>
          <HStack flex={0.5}>
            <Text flex={0.6} fontSize={14} fontWeight="bold" color="light.900">
              Chỉ số ghi được:
            </Text>
            <Text flex={0.4} fontSize={14} color="light.700">
              {item?.ChiSoGhiDuoc}
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Trạng thái:
          </Text>
          <Text
            flex={0.7}
            fontSize={14}
            fontWeight="bold"
            color={Boolean(Number(item?.TrangThai)) ? 'tertiary.600' : 'cyan.700'}
          >
            {Boolean(Number(item?.TrangThai)) ? 'Đã chốt' : 'Đang cập nhật'}
          </Text>
        </HStack>
        {/* <HStack mt={6} space={3} flex={1} w="100%">
          <Button
            flex={0.5}
            size="md"
            colorScheme="amber"
            _text={{
              color: '#ffffff',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
            }}
            onPress={showModal}
          >
            Sửa chỉ số
          </Button>
          <Button
            flex={0.5}
            size="md"
            colorScheme="red"
            _text={{
              color: '#ffffff',
              textTransform: 'uppercase',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Toạ độ
          </Button>
        </HStack> */}
      </VStack>
    </VStack>
  );
});

