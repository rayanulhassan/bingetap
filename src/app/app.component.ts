import { afterNextRender, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontalSolid } from '@ng-icons/heroicons/solid';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import {
  phosphorFloppyDisk,
  phosphorArrowCounterClockwise,
} from '@ng-icons/phosphor-icons/regular';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIconComponent, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideIcons({
      heroAdjustmentsHorizontalSolid,
      phosphorFloppyDisk,
      heroInformationCircle,
      phosphorArrowCounterClockwise,
    }),
  ],
})
export class AppComponent {
  title = 'bingetap';
  isDarkMode = signal<boolean>(false);

  iconColor = computed(() => {
    return this.isDarkMode() ? '#F5F4F4' : '#333333';
  });

  constructor() {
    afterNextRender(() => {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        this.isDarkMode.set(true);
      else this.isDarkMode.set(false);

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if (event.matches) this.isDarkMode.set(true);
          else this.isDarkMode.set(false);
        });
    });
  }
}
