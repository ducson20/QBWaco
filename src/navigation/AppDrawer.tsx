/* eslint-disable */

import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DefaultLayout from '../components/layouts/DefaultLayout';
import CustomDrawer from '../components/drawer/Drawer';
import Home from '../views/Home';
import InvoiceStack from './InvoiceStack';
import NoteBookStack from './NoteBookStack';
import DataSynchronizationStack from './DataSynchronizationStack';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home1"
      // useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      >
        {(props) => (
          <DefaultLayout {...props}>
            <Home />
          </DefaultLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Hóa Đơn"
        options={{
          drawerIcon: ({ color }) => <Ionicons name="receipt-outline" size={22} color={color} />,
        }}
        component={InvoiceStack}
      />
      <Drawer.Screen
        name="Sổ Ghi"
        options={{
          drawerIcon: ({ color }) => <Ionicons name="library-outline" size={22} color={color} />,
        }}
        component={NoteBookStack}
      />

      <Drawer.Screen
        name="Đồng Bộ Dữ Liệu"
        initialParams={{
          layDuLieuSoGhi: true,
        }}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cloud-download-outline" size={22} color={color} />
          ),
        }}
        component={DataSynchronizationStack}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
