/* eslint-disable */

import { useState, useEffect, useContext, useCallback, useMemo, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Modal,
  FlatList,
  Icon,
  Divider,
  Spinner,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import delay from 'delay';
import { LoadingContext } from '../../contexts';
import { useSearch } from '../../hooks';
import PeriodService, { IGetAllChuKyRes } from '../../services/period';
import { PAGINATION } from '../../constants';

export interface IFeePeriodProps {
  isShowModal: boolean;
  closeModal: () => void;
  selectPeriod: (value: string) => void;
}

export interface IMonthOfYear {
  id: string;
  monthOfYear: string;
}

export const FeePeriod = ({ isShowModal, closeModal, selectPeriod }: IFeePeriodProps) => {
  const { searchTextVal, debouncedValue, isLoading, setIsLoading, setSearchTextVal } = useSearch();
  const { setIsLoadingApp } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(2);
  const [dataFlag, setDataFlag] = useState<IGetAllChuKyRes[]>([]);
  const [dataSource, setDataSource] = useState<IGetAllChuKyRes[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  const onChangeSearchText = (value: string) => {
    setSearchTextVal(value);
    setIsLoading(true);
  };

  const clearSearchText = () => {
    setSearchTextVal('');
  };

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGINATION.pageSize;
    const lastPageIndex = firstPageIndex + PAGINATION.pageSize;
    return dataFlag.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataFlag]);

  const loadMoreResults = async () => {
    if (loadingMore || allLoaded) return;
    setLoadingMore(true);
    setCurrentPage(currentPage + 1);
    if (currentData.length === 0) {
      setAllLoaded(true);
    } else {
      setDataSource((prev) => [...prev, ...currentData]);
    }

    await delay(1000);
    setLoadingMore(false);
  };

  const loadData = useCallback(async () => {
    try {
      setIsLoadingApp(true);
      const dataReq = {
        username: 'Test01',
        password: 'Vnpt@123',
      };
      const res = await PeriodService.GetAllChuKy(dataReq);
      setDataFlag(res);
      setDataSource(res.slice(0, 20));
      setIsLoadingApp(false);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadDataSearch = useCallback(async () => {
    const filterDataSource = dataFlag?.filter((item) => item?.kycuoc.includes(debouncedValue));
    setDataSource(filterDataSource.slice(0, 20));
  }, [debouncedValue]);

  useEffect(() => {
    loadDataSearch();
    setIsLoading(false);
  }, [debouncedValue]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isShowModal} onClose={closeModal}>
      <Modal.Content maxHeight={400} minWidth={340} maxWidth={350} bg="white">
        <Modal.CloseButton />
        <Modal.Header
          bg="white"
          borderBottomColor="gray.400"
          _text={{ textAlign: 'center', fontSize: 16, color: 'secondary.600' }}
        >
          Kỳ cước
        </Modal.Header>
        <Modal.Body bg="white" _scrollview={{ scrollEnabled: false }}>
          <Input
            placeholder="Search"
            variant="underlined"
            w="100%"
            py={2}
            px={2}
            mb={10}
            fontSize={14}
            borderBottomColor="gray.500"
            color="black"
            InputLeftElement={
              <Icon size={5} color="gray.500" as={<Ionicons name="ios-search" />} />
            }
            InputRightElement={
              <>
                {isLoading ? (
                  <Spinner mr={2} color="gray.500" />
                ) : (
                  searchTextVal && (
                    <Icon
                      mr={2}
                      size={5}
                      color="gray.500"
                      as={<Ionicons name="close-circle-outline" onPress={clearSearchText} />}
                    />
                  )
                )}
              </>
            }
            value={searchTextVal}
            onChangeText={onChangeSearchText}
          />
        </Modal.Body>
        <FlatList
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={20}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={250}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={1}
          data={dataSource}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectPeriod(item.kycuoc)}>
              <Box px={5}>
                <Text mb={3} textAlign="left" fontSize={14} color="gray.500" fontWeight={600}>
                  {item?.kycuoc}
                </Text>
                <Divider mb={2} thickness={1} bg="gray.400" />
              </Box>
            </TouchableOpacity>
          )}
          ListFooterComponent={loadingMore ? <Spinner color="gray.500" /> : null}
          onEndReached={loadMoreResults}
          style={{ width: '100%' }}
        />
        <Modal.Footer p={1} bg="white" borderTopColor="gray.400">
          <Button
            size="sm"
            variant="ghost"
            colorScheme="secondary"
            _text={{
              textAlign: 'center',
              fontSize: 16,
              color: 'secondary.600',
              fontWeight: 600,
            }}
            onPress={closeModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default memo(FeePeriod);
