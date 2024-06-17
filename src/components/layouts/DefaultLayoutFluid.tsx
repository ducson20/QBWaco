/* eslint-disable */

import { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { useRoute } from '@react-navigation/native';
import {Platform} from "react-native"
import { Box, NativeBaseProvider, View } from 'native-base';

import Header from './Header';
import AppLoading from '../AppLoading';
import { SCREEN_NAME } from '../../constants';
import { LoadingContext } from '../../contexts';
import { useLoading } from '../../hooks';
import { getDBConnection } from '../../services/db-service';
import { theme, config } from '../../utils/custom-theme';

export interface IDefaultLayoutFluidProps {}

export default function DefaultLayoutFluid({ children }: PropsWithChildren) {
  const route = useRoute();
  const { isLoadingApp, setIsLoadingApp, message, setMessage } = useLoading();

  const checkingScreen = useMemo(() => {
    switch (true) {
      case route?.name === SCREEN_NAME.noteBookList || route?.name === SCREEN_NAME.waterNumberList:
        return false;
      default:
        return true;
    }
  }, [route]);

  return (
    <>
      <NativeBaseProvider theme={theme} config={config}>
        <AppLoading isShowLoading={isLoadingApp} message={message} />
        <LoadingContext.Provider
          value={{
            isLoadingApp,
            setIsLoadingApp,
            setMessage,
          }}
        >
          {checkingScreen && <Header />}
          <View flex={1} position="relative">
            {children}
          </View>
          {Platform.OS === 'ios' && <Box safeAreaBottom />}
        </LoadingContext.Provider>
      </NativeBaseProvider>
    </>
  );
}
