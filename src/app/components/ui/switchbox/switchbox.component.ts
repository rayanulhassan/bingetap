import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-switchbox',
  standalone: true,
  imports: [FormsModule,NgIconComponent],
  
  templateUrl: './switchbox.component.html',
})
export class SwitchboxComponent {
  checked = input<boolean>(false);
  checkedLabel = input<string>('Enabled');
  uncheckedLabel = input<string>('Disabled');
  onChange = output<boolean>();

  checkboxValue = signal<boolean>(this.checked());

  constructor() {
    effect(() => this.onChange.emit(this.checkboxValue()));
  }
}
