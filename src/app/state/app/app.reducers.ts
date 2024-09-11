import { createReducer, on } from '@ngrx/store';
import {
  DisableAutosave,
  DisableVibrateOnTap,
  DisbaleLaps,
  EnableAutosave,
  EnableLaps,
  EnableVibrateOnTap,
  GetDataFromLocalstorage,
  IncrementCounter,
  ResetCounter,
  SetLapCompletionIndicator,
  SetSoundOnTap,
  SetTapsPerLap,
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
    navigator.vibrate(pattern);
};

const playSound = (source:string) => {
  let audio: HTMLAudioElement = new Audio(`../../../assets/sounds/${source}.mp3`);
  audio.play();
};



export const initialState: AppState = {
  counter: 0,
  settings: {
    isAutosaveEnabled: true,
    backgroundImage: null,
    counterColor: 'default',
    lapCompletionIndicatior: 'vibrate',
    laps: false,
    tapSound: 'none',
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
    if(state.settings.vibrateOnTap) vibrate([100]);
    if (state.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
    if(state.settings.tapSound !== 'none') playSound(state.settings.tapSound);
    return newState;
  }),
  on(ResetCounter, (state) => {
    {
      const newState: AppState = { ...state, counter: 0 };
      if (state.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
      if(state.settings.vibrateOnTap) vibrate([150]);
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
      vibrate([150]);
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
  }),
  on(SetSoundOnTap, (state, { sound }) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, tapSound: sound },
      };
      saveStateInLocalstorage(newState);
      if(newState.settings.tapSound !== 'none') playSound(newState.settings.tapSound);
      return newState;
    }
  }),
  on(EnableLaps, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, laps: true },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
  on(DisbaleLaps, (state) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, laps: false },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
  on(SetTapsPerLap, (state, { tapCount }) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, tapsPerLap: tapCount },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),

  on(SetLapCompletionIndicator, (state, { indicator }) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, lapCompletionIndicatior: indicator },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
);
