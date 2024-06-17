/* eslint-disable */

import { useState, useEffect, useRef, useCallback, useContext, useMemo, memo } from 'react';
import { TouchableOpacity, VirtualizedList, Keyboard } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  Text,
  Spinner,
  Skeleton,
  AlertDialog,
} from 'native-base';
import delay from 'delay';

import { useDebounce } from 'usehooks-ts';

import Header from '../layouts/Header';
import { PAGINATION } from '../../constants';
import { LoadingContext } from '../../contexts';
import { useAlert } from '../../hooks';
import {
  getDBConnection,
  getDM_SoGhiChiSoList,
  countCSDH_SoGhiChiSo,
} from '../../services/db-service';
import type { IDM_SoGhiChiSo } from '../../services/db-service';

export interface INoteBookListProps {}

export default function NoteBookList(props: INoteBookListProps) {
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const cancelRef = useRef(null);

  const { isLoadingApp, setIsLoadingApp } = useContext(LoadingContext);
  const { isShowAlert, setIsShowAlert, showAlert, closeAlert } = useAlert();

  const [searchTextVal, setSearchTextVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(searchTextVal, 500);

  const [currentPage, setCurrentPage] = useState(2);
  const [dataFlag, setDataFlag] = useState<IDM_SoGhiChiSo[]>([]);
  const [dataSource, setDataSource] = useState<IDM_SoGhiChiSo[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const changeSearchInput = useCallback(
    async (value: string) => {
      setIsLoading(true);
      setSearchTextVal(value);
    },
    [searchTextVal, isLoading]
  );

  const clearSearchTextInput = useCallback(() => {
    setSearchTextVal('');
    setIsLoading(false);
  }, []);

  const onOk = () => {
    navigation.navigate('NoteBook');
    navigation.navigate('Đồng Bộ Dữ Liệu');
    closeAlert();
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGINATION.pageSize;
    const lastPageIndex = firstPageIndex + PAGINATION.pageSize;
    return dataFlag.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataFlag]);

  const loadMoreResults = async () => {
    if (loadingMore || allLoaded) return;
    if (currentData.length === 0) {
      setAllLoaded(true);
    } else {
      setCurrentPage(currentPage + 1);
      setLoadingMore(true);
      await delay(1000);
      setDataSource((prev) => [...prev, ...currentData]);
      setLoadingMore(false);
    }
  };
  const renderItems = useCallback(
    ({ item }: INoteBookListItem) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WaterNumberList', {
            id: item?.ID,
            ListChiSo: item?.ListChiSo,
          });
        }}
      >
        <NoteBookListItem item={item} />
      </TouchableOpacity>
    ),
    []
  );

  const resolveData = async (db: any, res: IDM_SoGhiChiSo[]) => {
    const chuaGhi = await countCSDH_SoGhiChiSo(db, false);
    const daGhi = await countCSDH_SoGhiChiSo(db, true);
    const dataTemp = res?.map((item) => {
      return {
        ...item,
        ChuaGhi:
          chuaGhi?.length !== 0
            ? chuaGhi?.find((i) => i?.ID === item?.ID)
            : { ID: item?.ID, SoLuongBanGhi: 0 },
        DaGhi:
          daGhi?.length !== 0
            ? daGhi?.find((i) => i?.ID === item?.ID)
            : { ID: item?.ID, SoLuongBanGhi: 0 },
      };
    });
    setDataFlag(dataTemp);
    const initialData = dataTemp.slice(0, 10)
    setDataSource(initialData);
    setIsLoading(false);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const db = await getDBConnection();
      await getDM_SoGhiChiSoList(db).then(async (res) => {
        resolveData(db, res);
        Keyboard.dismiss();
      });
    } catch (error) {
      setIsShowAlert(true);
      setIsLoading(false);
    }
  };

  const loadDataSearch = async () => {
    if (debouncedValue === '') {
      loadData();
    } else {
      try {
        setIsLoading(true);
        const db = await getDBConnection();
        await getDM_SoGhiChiSoList(db, debouncedValue).then(async (res) => {
          resolveData(db, res);
        });
      } catch (error) {
        setIsShowAlert(true);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadDataSearch();
  }, [debouncedValue, isFocused]);

  return (
    <>
      <Header
        searchTextVal={searchTextVal}
        isLoading={isLoading}
        changeSearchInput={changeSearchInput}
        clearSearchTextInput={clearSearchTextInput}
      />
      <Box flex={1} px={1} pt={2} bg="blue.600">
        {isLoading ? (
          <VStack flex={1} space={10}>
            <VStack space={4} overflow="hidden" rounded="md">
              <Skeleton h="4" startColor="primary.100" />
              <Skeleton.Text pr="6" startColor="primary.100" />
            </VStack>
            <VStack space={4} overflow="hidden" rounded="md">
              <Skeleton h="4" startColor="primary.100" />
              <Skeleton.Text pr="6" startColor="primary.100" />
            </VStack>
            <VStack space={4} overflow="hidden" rounded="md">
              <Skeleton h="4" startColor="primary.100" />
              <Skeleton.Text pr="6" startColor="primary.100" />
            </VStack>
          </VStack>
        ) : (
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
            ListFooterComponent={!allLoaded && loadingMore ? <Spinner color="gray.500" /> : null}
            onEndReached={loadMoreResults}
            style={{ flex: 1 }}
          />
        )}
      </Box>

      <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={cancelRef} isOpen={isShowAlert} onClose={closeAlert}>
        <AlertDialog.Content>
          <AlertDialog.Body bg="white">
            <Text mb={3} fontWeight="bold" fontSize={16} color="light.900">
              Thông báo
            </Text>
            <Text ml={2} mb={4} fontSize={14} color="light.900">
              Di chuyển đến màn hình Đồng Bộ Dữ Liệu để thực hiện lấy dữ liệu sổ ghi.
            </Text>
            <HStack w="100%" justifyContent="flex-end">
              <Button
                ref={cancelRef}
                variant="unstyled"
                colorScheme="secondary"
                _text={{
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: 'secondary.600',
                }}
                onPress={onOk}
              >
                OK
              </Button>
            </HStack>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}

const keyExtractor = (item: IDM_SoGhiChiSo) => String(item.ID);
const getItemCount = (data: IDM_SoGhiChiSo[]) => data.length;
const getItem = (data: IDM_SoGhiChiSo[], index: number) => data[index];

export interface INoteBookListItem {
  item: IDM_SoGhiChiSo;
}

export const NoteBookListItem = memo(({ item }: INoteBookListItem) => {
  return (
    <VStack flex={1} w="100%" mb={4} px={2} py={2} bg="white">
      <Heading fontSize={18} color="secondary.700" mb={2}>
        {item?.Ten}
      </Heading>
      <VStack flex={1} space={2}>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Số lượng ghi:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {item?.LoTrinh}
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Số lượng ghi:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {(item?.ChuaGhi?.SoLuongBanGhi ? item?.ChuaGhi?.SoLuongBanGhi : 0) +
              (item?.DaGhi?.SoLuongBanGhi ? item?.DaGhi?.SoLuongBanGhi : 0)}
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Chưa ghi:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {item?.ChuaGhi?.SoLuongBanGhi ? item?.ChuaGhi?.SoLuongBanGhi : 0}
          </Text>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Đã ghi:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {item?.DaGhi?.SoLuongBanGhi ? item?.DaGhi?.SoLuongBanGhi : 0}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
});
