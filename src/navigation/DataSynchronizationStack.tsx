/* eslint-disable */

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DefaultLayout } from '../components/layouts';
import DataSynchronization from '../views/DataSynchronization';

const Stack = createNativeStackNavigator();

const DataSynchronizationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DataSynchronization">
        {(props) => (
          <DefaultLayout {...props}>
            <DataSynchronization />
          </DefaultLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default DataSynchronizationStack;
