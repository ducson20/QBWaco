import type { RootState } from '../../store';

export const loadMoreItemsSelector = (state: RootState) => state.LoadMoreReducer.loadMoreItems;
export const noteBookItemsSelector = (state: RootState) => state.LoadMoreReducer.noteBookItems;

export const searchTextValSelector = (state: RootState) => state.SearchReducer.searchTextVal;
