import { Component, inject } from '@angular/core';
import { SwitchboxComponent } from '../ui/switchbox/switchbox.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { NzColor, NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectBackgroundImage,
  selectCounterColor,
  selectIsAutosaveEnabled,
  selectLapCompletionIndicator,
  selectLapsSettings,
  selectTapSound,
  selectTapsPerLap,
  selectVibrateOnTap,
} from '../../state/app/app.selectors';
import {
  DisableAutosave,
  DisableVibrateOnTap,
  DisbaleLaps,
  EnableAutosave,
  EnableLaps,
  EnableVibrateOnTap,
  SetBackgroundImage,
  SetCounterColor,
  SetLapCompletionIndicator,
  SetSoundOnTap,
  SetTapsPerLap,
} from '../../state/app/app.actions';
import {
  LapCompletionIndicators,
  LapCompletionIndicatorType,
  TapSounds,
  TapSoundType,
} from '../../models/settings';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [
    SwitchboxComponent,
    NgIconComponent,
    NzColorPickerComponent,
    FormsModule,
  ],
  templateUrl: './settings-modal.component.html',
  providers: [
    provideIcons({
      heroInformationCircle,
    }),
  ],
})
export class SettingsModalComponent {
  private store = inject(Store);

  readonly tapSounds = TapSounds;
  readonly lapCompletionIndicartors = LapCompletionIndicators;

  vibrateOnTap = toSignal(this.store.select(selectVibrateOnTap), {
    initialValue: true,
  });

  soundOnTap = toSignal(this.store.select(selectTapSound), {
    initialValue: 'none',
  });

  lapsSetting = toSignal(this.store.select(selectLapsSettings), {
    initialValue: false,
  });

  tapsPerLap = toSignal(this.store.select(selectTapsPerLap), {
    initialValue: 10,
  });
  lapCompletionIndicator = toSignal(
    this.store.select(selectLapCompletionIndicator),
    {
      initialValue: 'vibrate',
    }
  );
  backgoundImage = toSignal(this.store.select(selectBackgroundImage), {
    initialValue: null,
  });

  counterColor = toSignal(this.store.select(selectCounterColor), {
    initialValue: 'default',
  });

  isAutosaveEnabled = toSignal(this.store.select(selectIsAutosaveEnabled), {
    initialValue: true,
  });

  onVibrationSettingsChange(checkboxValue: boolean) {
    if (checkboxValue) this.store.dispatch(EnableVibrateOnTap());
    else this.store.dispatch(DisableVibrateOnTap());
  }

  onSoundOnTapSettingsChange(event: Event) {
    const sound = (event.target as HTMLInputElement).value as TapSoundType;
    this.store.dispatch(SetSoundOnTap({ sound }));
  }

  onLapsSettingsChange(checkboxValue: boolean) {
    if (checkboxValue) this.store.dispatch(EnableLaps());
    else this.store.dispatch(DisbaleLaps());
  }

  onLapsPerTapChange(event: Event) {
    const laps = +(event.target as HTMLInputElement).value;
    this.store.dispatch(SetTapsPerLap({ tapCount: laps }));
  }

  onLapCompletionIndicatorChange(event: Event) {
    const indicator = (event.target as HTMLInputElement)
      .value as LapCompletionIndicatorType;
    this.store.dispatch(SetLapCompletionIndicator({ indicator }));
  }

  onBackgroundImageSet(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target?.result as string;
        this.store.dispatch(SetBackgroundImage({ buffer }));
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onBackgroundImageReset() {
    const buffer = null;
    this.store.dispatch(SetBackgroundImage({ buffer }));
  }

  onColorChange(event: NzColor) {
    if (event.isValid) {
      console.log(event.toHex());
      this.store.dispatch(SetCounterColor({ color: `#${event.toHex()}` }));
    }
  }

  onResetColorChange() {
    this.store.dispatch(SetCounterColor({ color: 'default' }));
  }

  onAutosaveSettingChange(enableSetting: boolean) {
    if (!enableSetting) this.store.dispatch(DisableAutosave());
    else this.store.dispatch(EnableAutosave());
  }
}
