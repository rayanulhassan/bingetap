import { createSelector } from '@ngrx/store';
import { GlobalState } from '../global.state';
import { AppState } from './app.reducers';

export const selectApp = (state: GlobalState) => state.app;
export const selectCounter = createSelector(
  selectApp,
  (state: AppState) => state.counter
);

export const selectIsAutosaveEnabled = createSelector(
  selectApp,
  (state: AppState) => state.settings.isAutosaveEnabled
);

export const selectVibrateOnTap = createSelector(
  selectApp,
  (state: AppState) => state.settings.vibrateOnTap
);

