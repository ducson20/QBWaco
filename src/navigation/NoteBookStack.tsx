/* eslint-disable */

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DefaultLayout, DefaultLayoutFluid } from '../components/layouts';
import NoteBook from '../views/NoteBook';
import WaterNumberList from '../components/note-book/WaterNumberList';
import NoteBookList from '../components/note-book/NoteBookList';
import WaterNumberDetail from '../components/note-book/WaterNumberDetail';

const Stack = createNativeStackNavigator();

const NoteBookStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NoteBook">
        {(props) => (
          <DefaultLayout {...props}>
            <NoteBook />
          </DefaultLayout>
        )}
      </Stack.Screen>
      <Stack.Screen name="NoteBookList">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <NoteBookList />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
      <Stack.Screen name="WaterNumberList">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <WaterNumberList />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
      <Stack.Screen name="WaterNumberDetail">
        {(props) => (
          <DefaultLayoutFluid {...props}>
            <WaterNumberDetail />
          </DefaultLayoutFluid>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NoteBookStack;
