import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconType } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIconComponent,NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  text = input<string>();
  icon = input<IconType>();
  iconSize = input<string>("1.5rem");
  isActive = input<boolean>(false);
  isRound = input<boolean>(false);
  enableBorder = input<boolean>(false);
}
