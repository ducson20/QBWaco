import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearch {
  searchTextVal: string;
}

const initialState: ISearch = {
  searchTextVal: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchTextVal: (state, action: PayloadAction<string>) => {
      state.searchTextVal = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
