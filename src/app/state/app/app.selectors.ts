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

export const selectTapSound = createSelector(
  selectApp,
  (state: AppState) => state.settings.tapSound
);

export const selectLapsSettings = createSelector(
  selectApp,
  (state: AppState) => state.settings.laps
);

export const selectTapsPerLap = createSelector(
  selectApp,
  (state: AppState) => state.settings.tapsPerLap
);
export const selectLapCompletionIndicator = createSelector(
  selectApp,
  (state: AppState) => state.settings.lapCompletionIndicatior
);

export const selectLapTapsCounter = createSelector(
  selectApp,
  (state: AppState) => state.lapTapsCounter
);

export const selectLapsCount = createSelector(
  selectApp,
  (state: AppState) => state.laps
);

export const selectBackgroundImage = createSelector(
  selectApp,
  (state: AppState) => state.settings.backgroundImage
);
