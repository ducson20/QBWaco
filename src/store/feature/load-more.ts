import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDM_SoGhiChiSo } from '../../services/db-service';
interface ILoadMore {
  loadMoreItems: any[];
  noteBookItems: IDM_SoGhiChiSo[];
}

const initialState: ILoadMore = {
  loadMoreItems: [],
  noteBookItems: [],
};

const loadMoreSlice = createSlice({
  name: 'load-more',
  initialState,
  reducers: {
    updateListResults: (state, action: PayloadAction<any>) => {
      state.loadMoreItems = action.payload;
    },
    updateNoteBookListResults: (state, action: PayloadAction<IDM_SoGhiChiSo[]>) => {
      state.noteBookItems = action.payload;
    },
  },
});

export const loadMoreActions = loadMoreSlice.actions;

export default loadMoreSlice.reducer;
