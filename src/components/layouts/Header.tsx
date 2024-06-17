/* eslint-disable */

import { useMemo, useContext, memo } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { StatusBar, Box, VStack, HStack, Input, IconButton, Icon, Text } from 'native-base';

import AlertDialog from '../AlertDialog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from '../permission/AuthProvider';
import { SCREEN_NAME, HEADER_TITLE_VI } from '../../constants';
import { useAlert } from '../../hooks';

export interface IHeaderProps {
  searchTextVal?: string;
  isLoading?: boolean;
  changeSearchInput?: (value: string) => void;
  clearSearchTextInput?: () => void;
}

const Header = ({
  searchTextVal,
  isLoading,
  changeSearchInput,
  clearSearchTextInput,
}: IHeaderProps) => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { isShowAlert, closeAlert, showAlert } = useAlert();

  const { logout } = useContext(AuthContext);

  const onOk = async () => {
    closeAlert();
    await logout();
  };

  const headerTitle = useMemo(() => {
    switch (true) {
      case route?.name === SCREEN_NAME.home:
        return HEADER_TITLE_VI.home;
      case route?.name === SCREEN_NAME.invoice:
        return HEADER_TITLE_VI.invoice;
      case route?.name === SCREEN_NAME.noteBook:
        return HEADER_TITLE_VI.noteBook;
      case route?.name === SCREEN_NAME.dataSynchronization:
        return HEADER_TITLE_VI.dataSynchronization;
      case route?.name === SCREEN_NAME.debt:
        return HEADER_TITLE_VI.debt;
      case route?.name === SCREEN_NAME.summarize:
        return HEADER_TITLE_VI.summarize;
      default:
        break;
    }
  }, [route?.name]);

  const resultHeader = useMemo(() => {
    const isToggleMenu: boolean =
      route?.name === SCREEN_NAME.home ||
      route?.name === SCREEN_NAME.invoice ||
      route?.name === SCREEN_NAME.noteBook ||
      route?.name === SCREEN_NAME.dataSynchronization;
    switch (true) {
      case isToggleMenu:
        return (
          <>
            <HStack alignItems="center">
              <IconButton
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                icon={<Icon size="3xl" as={Ionicons} name="menu" color="white" />}
                mr="4"
              />
              <Text color="white" fontSize="20" fontWeight="medium">
                {headerTitle}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <IconButton
                icon={
                  <Icon
                    size="2xl"
                    as={Ionicons}
                    name="exit-outline"
                    color="white"
                    onPress={showAlert}
                  />
                }
              />
            </HStack>
          </>
        );
      case route?.name === SCREEN_NAME.debt || route?.name === SCREEN_NAME.summarize:
        return (
          <>
            <HStack alignItems="center">
              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                icon={<Icon size="3xl" as={Ionicons} name="arrow-back-outline" color="white" />}
                mr="4"
              />
              <Text color="white" fontSize="20" fontWeight="medium">
                {headerTitle}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <IconButton
                icon={
                  <Icon
                    size="2xl"
                    as={Ionicons}
                    name="exit-outline"
                    color="white"
                    onPress={showAlert}
                  />
                }
              />
            </HStack>
          </>
        );
      case route?.name === SCREEN_NAME.waterNumberDetail:
        return (
          <VStack flex={1} alignItems="center">
            <HStack justifyContent="space-between">
              <HStack>
                <IconButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                  icon={<Icon size="3xl" as={Ionicons} name="arrow-back-outline" color="white" />}
                  mr="4"
                />
              </HStack>
              <HStack flex={1} alignItems="center">
                <Text color="white" fontSize="20" fontWeight="medium">
                  {`${route?.params?.item?.KyCuoc} - ${route?.params?.item?.LoTrinh}`}
                </Text>
              </HStack>
              <HStack>
                <IconButton
                  icon={<Icon size="2xl" as={Ionicons} name="location-sharp" color="white" />}
                />
              </HStack>
            </HStack>
          </VStack>
        );
      case route?.name === SCREEN_NAME.noteBookList ||
        route?.name === SCREEN_NAME.waterNumberList ||
        route?.name === SCREEN_NAME.receiptProgress ||
        route?.name === SCREEN_NAME.receipt:
        return (
          <VStack flex={1} alignItems="center">
            <HStack justifyContent="space-between">
              <HStack>
                <IconButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                  icon={<Icon size="3xl" as={Ionicons} name="arrow-back-outline" color="white" />}
                  mr="4"
                />
              </HStack>
              <HStack flex={1}>
                <SearchBar
                  searchTextVal={searchTextVal}
                  isLoading={isLoading}
                  changeSearchInput={changeSearchInput}
                  clearSearchTextInput={clearSearchTextInput}
                />
              </HStack>
              <HStack p={2} />
            </HStack>
          </VStack>
        );
      default:
        return (
          <HStack justifyContent="space-between">
            <HStack>
              <IconButton
                onPress={() => navigation.goBack()}
                icon={<Icon size="3xl" as={Ionicons} name="arrow-back-outline" color="white" />}
                mr="4"
              />
            </HStack>
            <HStack flex={1}>
              <SearchBar
                searchTextVal={searchTextVal}
                isLoading={isLoading}
                changeSearchInput={changeSearchInput}
                clearSearchTextInput={clearSearchTextInput}
              />
            </HStack>
            <HStack>
              <IconButton
                icon={<Icon size="xl" as={Ionicons} name="qr-code-outline" color="white" />}
              />
            </HStack>
          </HStack>
        );
    }
  }, [route?.name, searchTextVal, isLoading]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      {Platform.OS === 'ios' && <Box safeAreaTop bg="primary.600" />}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        px={1}
        py={3}
        w="100%"
        bg="primary.600"
      >
        {resultHeader}
      </HStack>
      <AlertDialog
        message="Bạn có chắc chắn muốn đăng xuất."
        isOpen={isShowAlert}
        onClose={closeAlert}
        onOk={onOk}
      />
    </>
  );
};

export default memo(Header);

export interface ISearchBarProps {
  searchTextVal?: string;
  isLoading?: boolean;
  changeSearchInput?: (value: string) => void;
  clearSearchTextInput?: () => void;
}

const SearchBar = memo(
  ({ searchTextVal, isLoading, changeSearchInput, clearSearchTextInput }: ISearchBarProps) => {
    const route = useRoute();

    const resolveSearchTextPlaceholder = useMemo(() => {
      switch (true) {
        case route?.name === SCREEN_NAME.noteBookList ||
          route?.name === SCREEN_NAME.receiptProgress:
          return 'Tìm kiếm lộ trình';
        case route?.name === SCREEN_NAME.waterNumberList:
          return 'Tìm kiếm tên, mã khách hàng,\nmã hợp đồng';
        case route?.name === SCREEN_NAME.noteBookList || route?.name === SCREEN_NAME.receipt:
          return 'Tìm kiếm tên, mã khách hàng';
        default:
          break;
      }
    }, [route]);
    return (
      <HStack w="100%" alignSelf="center">
        <Input
          returnKeyType="search"
          autoFocus
          placeholderTextColor="gray.500"
          multiline={true}
          numberOfLines={1}
          placeholder={resolveSearchTextPlaceholder}
          width="100%"
          py={3}
          px={1}
          fontSize={14}
          borderColor="white"
          borderRadius={4}
          color="gray.500"
          bg="white"
          shadow={30}
          InputLeftElement={
            <Icon m={2} ml={3} size={7} color="gray.500" as={<MaterialIcons name="search" />} />
          }
          InputRightElement={
            <>
              {searchTextVal && (
                <Icon
                  mr={2}
                  size={5}
                  color="gray.500"
                  as={<Ionicons name="close-circle-outline" onPress={clearSearchTextInput} />}
                />
              )}
            </>
          }
          _focus={{
            borderColor: 'gray.500',
            color: 'gray.500',
            bg: 'white',
          }}
          blurOnSubmit={false}
          value={searchTextVal}
          onChangeText={changeSearchInput}
        />
      </HStack>
    );
  }
);
