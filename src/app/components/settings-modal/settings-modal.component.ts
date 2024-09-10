import { Component, inject } from '@angular/core';
import { SwitchboxComponent } from '../ui/switchbox/switchbox.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectVibrateOnTap } from '../../state/app/app.selectors';
import {
  DisableVibrateOnTap,
  EnableVibrateOnTap,
} from '../../state/app/app.actions';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [SwitchboxComponent, NgIconComponent, NzColorPickerComponent],
  templateUrl: './settings-modal.component.html',
  providers: [
    provideIcons({
      heroInformationCircle,
    }),
  ],
})
export class SettingsModalComponent {
  private store = inject(Store);

  vibrateOnTap = toSignal(this.store.select(selectVibrateOnTap), {
    initialValue: true,
  });

  onVibrationSettingsChange(checkboxValue:boolean) {
    if (checkboxValue) this.store.dispatch(EnableVibrateOnTap());
    else this.store.dispatch(DisableVibrateOnTap());
  }
}
