/* eslint-disable */

import { useState, useEffect, useContext } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Button, HStack, useToast, Text } from 'native-base';
import { flatten } from 'lodash';
import { useNetInfo } from '@react-native-community/netinfo';

import FeePeriod from '../components/data-synchronization/FeePeriod';
import { ToastAlert } from '../components/ToastAlert';

import { LoadingContext } from '../contexts';
import { useModal } from '../hooks';
import NoteBookService from '../services/note-book';
import {
  getDBConnection,
  createTable,
  saveDM_SoGhiChiSoItems,
  saveCSDH_SoGhiChiSoItems,
  getCSDH_SoGhiChiSoListByStaffId,
  IDM_SoGhiChiSo,
  ICSDH_SoGhiChiSo,
} from '../services/db-service';

export interface IDataSynchronizationProps {}

export default function DataSynchronization(): JSX.Element {
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const toast = useToast();
  const netInfo = useNetInfo();

  const { isShowModal, showModal, closeModal } = useModal();
  const { setIsLoadingApp, setMessage } = useContext(LoadingContext);
  const [period, setPeriod] = useState<string>('');

  const getSoGhiChiSo = async () => {
    if (!netInfo?.isConnected) {
      const internetToastId = 'internet-toast';
      if (!toast.isActive(internetToastId)) {
        toast.show({
          id: internetToastId,
          render: () => {
            return (
              <ToastAlert
                title="Có vẻ như thiết bị của bạn chưa được kết nối với Internet."
                status="warning"
              />
            );
          },
          placement: 'top',
          duration: 3000,
        });
      }
      return;
    }
    setMessage('Đang thực hiện quá trình lấy dữ liệu sổ ghi.');
    setIsLoadingApp(true);
    const res = await NoteBookService.DongBoSoGhi(1);
    const cloneNoteBooksData: ICSDH_SoGhiChiSo[] = [];

    res.data.forEach((item: any) => {
      if (item?.ListChiSo) cloneNoteBooksData.push(item.ListChiSo);
    });
    try {
      const db = await getDBConnection();
      await createTable(db);
      await saveDM_SoGhiChiSoItems(db, res.data);
      await saveCSDH_SoGhiChiSoItems(db, flatten(cloneNoteBooksData));
    } catch (error) {
      console.error('Error: ', error);
    }

    setIsLoadingApp(false);

    toast.show({
      render: () => {
        return <ToastAlert title="Đồng bộ dữ liệu số ghi thành công." />;
      },
      placement: 'top',
      duration: 3000,
    });
  };

  const syncSoGhiChiSo = async () => {
    try {
      const db = await getDBConnection();
      await getCSDH_SoGhiChiSoListByStaffId(db, 1).then(async (res) => {
        const dataReq = {
          NguoiDungID: 1,
          ListSoGhi: res,
        };
        const data = await NoteBookService.SyncSoGhiToServer(dataReq);
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const selectPeriod = (value: string) => {
    setPeriod(value);
    closeModal();
  };

  return (
    <>
      {/* <HStack justifyContent="space-between" space={2} mb={2}>
        <HStack flex={0.5}>
          <Button
            size="md"
            colorScheme="primary"
            w="100%"
            _text={{
              color: '#ffffff',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
            }}
            onPress={showModal}
          >
            Chọn kỳ cước
          </Button>
        </HStack>
        <HStack flex={0.5} alignItems="center" borderBottomColor="light.700" borderBottomWidth={1}>
          <Text fontSize={16} color="light.700">
            {period}
          </Text>
        </HStack>
      </HStack> */}
      <HStack justifyContent="space-between" space={2} mb={2}>
        <HStack flex={0.5}>
          <Button
            size="md"
            colorScheme="secondary"
            w="100%"
            _text={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            Lấy giữ liệu hóa đơn
          </Button>
        </HStack>
        <HStack flex={0.5}>
          <Button
            size="md"
            colorScheme="secondary"
            w="100%"
            _text={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            Đồng bộ giữ liệu hóa đơn
          </Button>
        </HStack>
      </HStack>
      <HStack justifyContent="space-between" space={2} mb={2}>
        <HStack flex={0.5}>
          <Button
            size="md"
            colorScheme="danger"
            w="100%"
            _text={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
            }}
            onPress={getSoGhiChiSo}
          >
            Lấy dữ liệu sổ ghi
          </Button>
        </HStack>
        <HStack flex={0.5}>
          <Button
            size="md"
            colorScheme="danger"
            w="100%"
            _text={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
            }}
            onPress={syncSoGhiChiSo}
          >
            Đồng bộ giữ liệu số ghi
          </Button>
        </HStack>
      </HStack>
      {/* <FeePeriod isShowModal={isShowModal} selectPeriod={selectPeriod} closeModal={closeModal} /> */}
    </>
  );
}
