import { Component } from '@angular/core';
import { SwitchboxComponent } from "../ui/switchbox/switchbox.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [SwitchboxComponent,NgIconComponent,NzColorPickerComponent],
  templateUrl: './settings-modal.component.html',
  providers: [
    provideIcons({
      heroInformationCircle,
    }),
  ]
})
export class SettingsModalComponent {

}
