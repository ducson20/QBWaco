/* eslint-disable */

import { useState, createContext, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingContext } from '../../contexts';
import AuthService from '../../services/auth';
import type { ILoginReq, ILoginRes } from '../../services/auth';

export const AuthContext = createContext<any>(null);

export interface IAuthProviderProps {
  children: JSX.Element;
}

const fakeToken = 'Fake token';

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<ILoginRes | {}>({});
  const [token, setToken] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = async (data: ILoginReq) => {
    setIsLoading(true);
    const res: ILoginRes = await AuthService.login(data);
    if (res?.Id !== 0) {
      await AsyncStorage.setItem('QBWACO-TOKEN', res.Username);
      await AsyncStorage.setItem('userInfo', JSON.stringify(res));
      setToken(res.Username);
      setUserInfo(res);
    }

    setIsLoading(false);
    return res;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('QBWACO-TOKEN');
    await AsyncStorage.removeItem('userInfo');
    setToken('');
    setUserInfo({});
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('QBWACO-TOKEN');
    const userInfo = await AsyncStorage.getItem('userInfo');
    const userInfoJson = userInfo !== null ? JSON.parse(userInfo) : {};
    setToken(token);
    setUserInfo(userInfoJson);
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, logout, userInfo, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
