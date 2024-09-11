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
  SetBackgroundImage,
  SetCounterColor,
  SetLapCompletionIndicator,
  SetSoundOnTap,
  SetTapsPerLap,
} from './app.actions';
import { Settings } from '../../models/settings';

const LC_KEY = 'bingetap-lc-db';

export interface AppState {
  counter: number;
  lapTapsCounter: number;
  laps: number;
  settings: Settings;
}

const saveStateInLocalstorage = (state: AppState) => {
  localStorage.setItem(LC_KEY, JSON.stringify(state));
};

const vibrate = (pattern: number[]) => {
  navigator.vibrate(pattern);
};

const playSound = (source: string) => {
  let audio: HTMLAudioElement = new Audio(
    `../../../assets/sounds/${source}.mp3`
  );
  audio.play();
};

export const initialState: AppState = {
  counter: 0,
  laps: 0,
  lapTapsCounter: 0,
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

    if (!state.settings.isAutosaveEnabled) state.counter = 0;
    return state;
  }),
  on(IncrementCounter, (state) => {
    const newState: AppState = { ...state, counter: state.counter + 1 };
    if (newState.settings.vibrateOnTap) vibrate([100]);
    if (newState.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
    if (newState.settings.tapSound !== 'none')
      playSound(newState.settings.tapSound);

    if (newState.settings.laps) {
      // only when laps settings are on
      const tapsAllowedPerLaps = newState.settings.tapsPerLap; // allowed taps per lap

      if (newState.lapTapsCounter + 1 === tapsAllowedPerLaps) {
        // if incrementing a lap tap counter results in lap tap counter = tapsAllowedPerLaps,
        // instead of incrementing lap tap counter, set it to 0 and increment lap counter to
        // show a lap has completed
        newState.lapTapsCounter = 0;
        newState.laps += 1;
        if (
          newState.settings.lapCompletionIndicatior === 'sound' ||
          newState.settings.lapCompletionIndicatior === 'sound & vibrate'
        )
          playSound('lap-alert');

        if (
          newState.settings.lapCompletionIndicatior === 'vibrate' ||
          newState.settings.lapCompletionIndicatior === 'sound & vibrate'
        )
          vibrate([150]);
      } else if (newState.lapTapsCounter + 1 < tapsAllowedPerLaps) {
        newState.lapTapsCounter += 1;
      }
    }
    return newState;
  }),
  on(ResetCounter, (state) => {
    {
      const newState: AppState = { ...state, counter: 0 };
      if (state.settings.isAutosaveEnabled) saveStateInLocalstorage(newState);
      if (state.settings.vibrateOnTap) vibrate([150]);
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
      if (newState.settings.tapSound !== 'none')
        playSound(newState.settings.tapSound);
      return newState;
    }
  }),
  on(EnableLaps, (state) => {
    {
      const newState: AppState = {
        ...state,
        laps: 0,
        lapTapsCounter: 0,
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
  on(SetBackgroundImage, (state, { buffer }) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, backgroundImage: buffer },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  }),
  on(SetCounterColor, (state, { color }) => {
    {
      const newState: AppState = {
        ...state,
        settings: { ...state.settings, counterColor: color },
      };
      saveStateInLocalstorage(newState);
      return newState;
    }
  })
);
