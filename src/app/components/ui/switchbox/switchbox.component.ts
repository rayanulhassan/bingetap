import {
  AfterViewInit,
  Component,
  effect,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-switchbox',
  standalone: true,
  imports: [FormsModule, NgIconComponent],

  templateUrl: './switchbox.component.html',
})
export class SwitchboxComponent implements OnChanges {
  checked = input<boolean>(false);
  checkedLabel = input<string>('Enabled');
  uncheckedLabel = input<string>('Disabled');
  onChange = output<boolean>();

  checkboxValue = signal<boolean>(false);
  private checkedFirstChange: boolean = true;

  constructor() {
    effect(() => {
      const checkboxValue = this.checkboxValue()
      if (!this.checkedFirstChange) {
        this.onChange.emit(checkboxValue);
      }
      else{
        this.checkedFirstChange = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checked']) {
      this.checkboxValue.set(this.checked());
      this.checkedFirstChange = changes['checked'].isFirstChange();
    }
  }
}
