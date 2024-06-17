/* eslint-disable */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/components/permission/AuthProvider';
import AppNav from './src/navigation/AppNav';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <AuthProvider>
            <AppNav />
          </AuthProvider>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
