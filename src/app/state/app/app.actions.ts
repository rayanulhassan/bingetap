import { createAction, props } from '@ngrx/store';
import { LapCompletionIndicatorType, TapSoundType } from '../../models/settings';

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

export const SetSoundOnTap = createAction(
  '[Counter] Set Sound On Tap',
  props<{ sound: TapSoundType }>()
);
export const EnableLaps = createAction(
  '[Counter] Enable Laps',
);

export const DisbaleLaps = createAction(
  '[Counter] Disable Laps',
);

export const SetTapsPerLap = createAction(
  '[Counter] Set Taps Per Laps',
  props<{ tapCount: number }>()
);

export const SetLapCompletionIndicator = createAction(
  '[Counter] Set Laps Completion Indicator',
  props<{ indicator: LapCompletionIndicatorType }>()
);

export const SetBackgroundImage = createAction(
  '[Counter] Set Background Image',
  props<{ buffer:string | null }>()
);