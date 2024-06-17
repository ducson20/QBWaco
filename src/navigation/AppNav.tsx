/* eslint-disable */

import { useContext } from 'react';
import { NativeBaseProvider } from 'native-base';

import { theme, config } from '../utils/custom-theme';

import { AuthContext } from '../components/permission/AuthProvider';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';

const AppNav = () => {
  const { token, isLoading } = useContext(AuthContext);
  return (
    <NativeBaseProvider theme={theme} config={config}>
      {token ? <AppDrawer /> : <AuthStack />}
    </NativeBaseProvider>
  );
};

export default AppNav;
