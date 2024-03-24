import { createAction, props } from '@ngrx/store';
import { MovieCard } from '../../interfaces/MovieCard'

export const searchResult = createAction(
  '[Header Component] Search Result',
  props<{ results: MovieCard[] }>()
);