import { Component, inject } from '@angular/core';
import { SwitchboxComponent } from '../ui/switchbox/switchbox.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectTapSound,
  selectVibrateOnTap,
} from '../../state/app/app.selectors';
import {
  DisableVibrateOnTap,
  EnableVibrateOnTap,
  SetSoundOnTap,
} from '../../state/app/app.actions';
import { TapSounds, TapSoundType } from '../../models/settings';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [SwitchboxComponent, NgIconComponent, NzColorPickerComponent,FormsModule],
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

  vibrateOnTap = toSignal(this.store.select(selectVibrateOnTap), {
    initialValue: true,
  });

  soundOnTap = toSignal(this.store.select(selectTapSound), {
    initialValue: 'none',
  });

  onVibrationSettingsChange(checkboxValue: boolean) {
    if (checkboxValue) this.store.dispatch(EnableVibrateOnTap());
    else this.store.dispatch(DisableVibrateOnTap());
  }

  onSoundOnTapSettingsChange(event: Event) {
    const sound = (event.target as HTMLInputElement).value as TapSoundType;
    this.store.dispatch(SetSoundOnTap({ sound }));
  }
}
