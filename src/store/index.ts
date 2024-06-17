import { configureStore } from '@reduxjs/toolkit';
import LoadMoreReducer from './feature/load-more';
import SearchReducer from './feature/search';

export const store = configureStore({
  reducer: {
    LoadMoreReducer,
    SearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
