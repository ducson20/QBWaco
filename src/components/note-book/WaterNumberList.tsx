/* eslint-disable */

import { useState, useEffect, useCallback, useContext, useMemo, memo } from 'react';
import { TouchableOpacity, VirtualizedList, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Box, VStack, HStack, Heading, Text, Spinner, Skeleton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import delay from 'delay';
import { useDebounce } from 'usehooks-ts';

import Header from '../layouts/Header';
import { PAGINATION } from '../../constants';
import { LoadingContext } from '../../contexts';
import { getDBConnection, getCSDH_SoGhiChiSoList } from '../../services/db-service';
import type { ICSDH_SoGhiChiSo } from '../../services/db-service';

export interface IWaterNumberProps {}

export interface IEditWaterNumberForm {
  ChiSoGhiDuoc: number;
  NgayGhiThucTe: string;
}

export default function WaterNumberList(props: IWaterNumberProps) {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const { isLoadingApp, setIsLoadingApp } = useContext(LoadingContext);

  const [searchTextVal, setSearchTextVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(searchTextVal, 500);

  const [currentPage, setCurrentPage] = useState(3);
  const [dataTemp, setDataTemp] = useState<ICSDH_SoGhiChiSo[]>([]);
  const [dataSource, setDataSource] = useState<ICSDH_SoGhiChiSo[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const changeSearchInput = useCallback(
    async (value: string) => {
      if (!value) {
        setIsLoading(false);
      }
      setIsLoading(true);
      setSearchTextVal(value);
    },
    [searchTextVal, isLoading]
  );

  const clearSearchTextInput = useCallback(() => {
    setSearchTextVal('');
    setIsLoading(false);
  }, []);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGINATION.pageSize;
    const lastPageIndex = firstPageIndex + PAGINATION.pageSize;
    return dataTemp.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataTemp]);

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
    ({ item }: IWaterNumberItem) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WaterNumberDetail', { item });
        }}
      >
        <WaterNumberItem key={item.ID} item={item} />
      </TouchableOpacity>
    ),
    []
  );

  const loadData = async () => {
    var startTime = performance.now();
    try {
      setIsLoading(true);
      const db = await getDBConnection();

      const dataReq = {
        id: route?.params?.id,
        searchText: '',
      };

      await getCSDH_SoGhiChiSoList(db, dataReq).then((res) => {
        if (res[0]?.ID) {
          setDataTemp(res);
          const initialData = res.slice(0, 20);
          setDataSource(initialData);
          setIsLoading(false);
          var endTime = performance.now();
          console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
        } else {
          setIsLoading(false);
        }
        Keyboard.dismiss();
      });
    } catch (error) {
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
        const dataReq = {
          id: route?.params?.id,
          searchText: debouncedValue,
        };
        await getCSDH_SoGhiChiSoList(db, dataReq).then((res) => {
          setDataTemp(res);
          const initialData = res.slice(0, 20);
          setDataSource(initialData);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadDataSearch();
  }, [debouncedValue]);

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
    </>
  );
}

const keyExtractor = (item: any) => String(item.ID);
const getItemCount = (data: ICSDH_SoGhiChiSo[]) => data.length;
const getItem = (data: ICSDH_SoGhiChiSo[], index: number) => data[index];

export interface IWaterNumberItem {
  item: ICSDH_SoGhiChiSo;
}

export const WaterNumberItem = memo(({ item }: IWaterNumberItem) => {
  return (
    <VStack flex={1} w="100%" mb={4} px={2} py={2} bg="white">
      <Heading fontSize={18} color="secondary.700" mb={2}>
        {item?.HoTen}
      </Heading>
      <VStack flex={1} space={2}>
        <HStack>
          <HStack flex={0.5}>
            <Text flex={0.6} fontSize={14} fontWeight="bold" color="light.900">
              STT:
            </Text>
            <Text flex={0.4} fontSize={14} color="light.700">
              {item.STT}
            </Text>
          </HStack>
          <HStack flex={0.5}>
            <Text flex={0.4} fontSize={14} fontWeight="bold" color="light.900">
              Mã KH:
            </Text>
            <Text flex={0.6} fontSize={14} color="secondary.700">
              {item?.MaKH}
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text flex={0.3} fontSize={14} fontWeight="bold" color="light.900">
            Mã hợp đồng:
          </Text>
          <Text flex={0.7} fontSize={14} color="light.700">
            {item.MaHopDong}
          </Text>
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
      </VStack>
    </VStack>
  );
});
