import { createAction, props } from '@ngrx/store';

export const GetDataFromLocalstorage = createAction(
  '[Counter] Get Data From Localstorage',
);

export const IncrementCounter = createAction(
  '[Counter] Increment Counter',
);

export const ResetCounter = createAction(
  '[Counter] Reset Counter',
);

export const EnableAutosave = createAction(
  '[Counter] Enable Autosave',
);

export const DisableAutosave = createAction(
  '[Counter] Disable Autosave',
);

export const EnableVibrateOnTap = createAction(
  '[Counter] Enable Vibrate On Tap',
);
export const DisableVibrateOnTap = createAction(
  '[Counter] Disable Vibrate On Tap',
);
