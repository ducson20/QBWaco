/* eslint-disable */

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DefaultLayout, DefaultLayoutFluid } from '../components/layouts';
import Invoice from '../views/Invoice';
import Receipt from '../components/invoice/Receipt';
import Summarize from '../components/invoice/Summarize';
import Debt from '../components/invoice/Debt';
import ReceiptProgress from '../components/invoice/ReceiptProgress';

const Stack = createNativeStackNavigator();

const InvoiceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Invoice">
        {(props) => (
          <DefaultLayout {...props}>
            <Invoice />
          </DefaultLayout>
        )}
      </Stack.Screen>
      <Stack.Screen name="ReceiptProgress">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <ReceiptProgress />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
      <Stack.Screen name="Receipt">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <Receipt />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
      <Stack.Screen name="Summarize">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <Summarize />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
      <Stack.Screen name="Debt">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <Debt />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InvoiceStack;
