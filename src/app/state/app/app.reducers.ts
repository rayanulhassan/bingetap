import { createReducer, on } from '@ngrx/store';
import {
  DisableAutosave,
  DisableVibrateOnTap,
  EnableAutosave,
  EnableVibrateOnTap,
  GetDataFromLocalstorage,
  IncrementCounter,
  ResetCounter,
} from './app.actions';
import { Settings } from '../../models/settings';

const LC_KEY = 'bingetap-lc-db';

export interface AppState {
  counter: number;
  settings: Settings;
}

const saveStateInLocalstorage = (state: AppState) => {
  localStorage.setItem(LC_KEY, JSON.stringify(state));
};

const vibrate = (pattern: number[]) => {
  console.log('vibrate');
    navigator.vibrate(pattern);
};

export const initialState: AppState = {
  counter: 0,
  settings: {
    isAutosaveEnabled: true,
    backgroundImage: null,
    counterColor: 'default',
    lapCompletionIndicatior: 'vibrate',
    laps: true,
    soundOnTap: false,
    tapSound: 'option-1',
    tapsPerLap: 10,
    vibrateOnTap: true,
  },
};

export const appReducer = createReducer(
  initialState,
  on(GetDataFromLocalstorage, (state) => {
    const data = localStorage.getItem(LC_KEY);
    if (data) state = JSON.parse(data) as AppState;
    else localStorage.setItem(LC_KEY, JSON.stringify(state));
    return state;
  }),
  on(IncrementCounter, (state) => {
    const newState: AppState = { ...state, counter: state.counter + 1 };
    if(state.settings.vibrateOnTap) vibrate([200]);
    if (state.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
    return newState;
  }),
  on(ResetCounter, (state) => {
    {
      const newState: AppState = { ...state, counter: 0 };
      if (state.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
      if(state.settings.vibrateOnTap) vibrate([400]);
      return newState;
    }
  }),
  on(EnableAutosave, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, isAutosaveEnabled: true },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
  on(DisableAutosave, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, isAutosaveEnabled: false },
      };
      saveStateInLocalstorage({ ...newState, counter: 0 });
      return newState;
    }
  }),
  on(EnableVibrateOnTap, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, vibrateOnTap: true },
      };
      vibrate([200]);
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
  on(DisableVibrateOnTap, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, vibrateOnTap: false },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  })

  // on(signInFailure, (state, { message }) => ({
  //   ...state,
  //   errorMessage: message,
  //   status: AuthStatus.ERROR,
  // }))
);
