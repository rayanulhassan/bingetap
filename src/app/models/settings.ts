export interface Settings {
    isAutosaveEnabled: boolean;
    vibrateOnTap: boolean;
    soundOnTap: boolean;
    laps:boolean;
    tapsPerLap:number;
    lapCompletionIndicatior: 'vibrate' | 'flash' | 'sound' | 'none';
    tapSound: 'option-1' | 'option-2' | 'option-3';
    backgroundImage: string | null;
    counterColor: string;
}