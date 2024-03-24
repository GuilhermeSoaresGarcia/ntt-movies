import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { searchReducer } from './search.reducer'

export interface State { }

export const reducers: ActionReducerMap<State> = {
  search: searchReducer  
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
