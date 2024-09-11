export const TapSounds = ['none', 'option-1' ,'option-2' , 'option-3'] as const;
export const LapCompletionIndicators = ['none', 'vibrate' ,'flash' , 'sound'] as const;
export type TapSoundType = typeof TapSounds[number];
export type LapCompletionIndicatorType = 'vibrate' | 'flash' | 'sound' | 'none';

export interface Settings {
    isAutosaveEnabled: boolean;
    vibrateOnTap: boolean;
    laps:boolean;
    tapsPerLap:number;
    lapCompletionIndicatior: LapCompletionIndicatorType;
    tapSound: TapSoundType;
    backgroundImage: string | null;
    counterColor: string;
}