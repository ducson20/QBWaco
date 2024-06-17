/* eslint-disable */

import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactNative, { StyleSheet, Platform } from 'react-native';
import {
  StatusBar,
  Box,
  Text,
  VStack,
  HStack,
  Center,
  FormControl,
  Input,
  Icon,
  Pressable,
  Image,
  useToast,
} from 'native-base';

import ToastAlert from '../../components/ToastAlert';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import AppLoading from '../../components/AppLoading';
import { AuthContext } from '../../components/permission/AuthProvider';
import { ILoginReq } from '../../services/auth';

export interface ILoginProps {}

const registerOptions = {
  username: { required: 'Tên đăng nhập là bắt buộc' },
  password: {
    required: 'Mật khẩu là bắt buộc',
  },
};

export default function Login() {
  const toast = useToast();
  const { signIn, isLoading } = useContext(AuthContext);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginReq>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILoginReq) => {
    const res = await signIn(data);
    if (res?.Id === 0) {
      const invalidUsernamOrPassword = 'invalid-usernam-or-password';
      if (!toast.isActive(invalidUsernamOrPassword)) {
        toast.show({
          id: invalidUsernamOrPassword,
          render: () => {
            return (
              <ToastAlert title="Tên người dùng hoặc mật khẩu không đúng." status="error" />
            );
          },
          placement: 'top',
          duration: 3000,
        });
      }
    }
  };

  return (
    <>
      <AppLoading isShowLoading={isLoading} />
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="primary.600" />
      <LinearGradient
        colors={['#054dff', '#1bc2ff', '#3ad0ff']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      >
        <Center flex={1}>
          <Image
            source={{
              uri: 'http://capnuocquangbinh.vn/Content/image/logo.png',
            }}
            alt="logo"
            size={150}
            borderRadius={100}
          />
          <HStack>
            <Text fontSize={32} fontWeight={800} fontStyle="italic" color="white">
              Quản lý khách hàng
            </Text>
          </HStack>
          <Center w="100%">
            <Box w="100%" maxW="320">
              <VStack space={6} mt="5">
                <VStack>
                  <FormControl
                    backgroundColor="#fff9c6"
                    borderRadius={Platform.OS === 'ios' ? 20 : 24}
                    shadow={2}
                  >
                    <Controller
                      name="username"
                      rules={registerOptions.username}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            variant="rounded"
                            size="xl"
                            placeholder="Tên đăng nhập"
                            color="black"
                            borderColor="gray.400"
                            InputLeftElement={
                              <Icon
                                as={<MaterialIcons name="person" />}
                                size={7}
                                ml="2"
                                color="muted.400"
                              />
                            }
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                          />
                        </>
                      )}
                    />
                  </FormControl>
                  {errors?.username && (
                    <HStack alignItems="center" mt={2}>
                      <Icon
                        as={<Ionicons name="alert-circle-outline" />}
                        size={5}
                        ml={2}
                        mr={1}
                        color="rgb(239, 68, 68)"
                      />
                      <Text fontSize={14} fontWeight={600} color="rgb(239, 68, 68)">
                        {errors?.username.message}
                      </Text>
                    </HStack>
                  )}
                </VStack>
                <VStack>
                  <FormControl
                    backgroundColor="#fff9c6"
                    borderRadius={Platform.OS === 'ios' ? 20 : 24}
                    shadow={2}
                  >
                    <Controller
                      name="password"
                      rules={registerOptions.password}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            type={isShowPassword ? 'text' : 'password'}
                            variant="rounded"
                            size="xl"
                            placeholder="Mật khẩu"
                            color="black"
                            borderColor="gray.400"
                            InputLeftElement={
                              <Icon
                                as={<MaterialIcons name="lock" />}
                                size={7}
                                ml="2"
                                color="muted.400"
                              />
                            }
                            InputRightElement={
                              <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
                                <Icon
                                  as={
                                    <MaterialIcons
                                      name={isShowPassword ? 'visibility' : 'visibility-off'}
                                    />
                                  }
                                  size={7}
                                  mr="2"
                                  color="muted.400"
                                />
                              </Pressable>
                            }
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                          />
                        </>
                      )}
                    />
                  </FormControl>
                  {errors?.password && (
                    <HStack alignItems="center" mt={2}>
                      <Icon
                        as={<Ionicons name="alert-circle-outline" />}
                        size={5}
                        ml={2}
                        mr={1}
                        color="rgb(239, 68, 68)"
                      />
                      <Text fontSize={14} fontWeight={600} color="rgb(239, 68, 68)">
                        {errors?.password.message}
                      </Text>
                    </HStack>
                  )}
                </VStack>

                <HStack>
                  <LinearGradient
                    colors={['#01efed', '#5e52b4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ ...styles.linearGradient, borderRadius: 20 }}
                  >
                    <ReactNative.Pressable onPress={handleSubmit(onSubmit)}>
                      <HStack justifyContent="center">
                        <Text
                          p={3}
                          textAlign="center"
                          alignItems="center"
                          fontSize={16}
                          fontWeight={600}
                        >
                          Đăng nhập
                        </Text>
                      </HStack>
                    </ReactNative.Pressable>
                  </LinearGradient>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Center>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
