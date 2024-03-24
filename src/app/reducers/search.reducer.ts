import { createReducer, on } from '@ngrx/store';
import { searchResult } from './actions/search.actions';

export const initialState = [];

export const searchReducer = createReducer(
  initialState,
  on(searchResult, (state, { results }) => ({
    ...state,
    searchResults: results,
  }))
);