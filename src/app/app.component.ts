import {
  afterNextRender,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAdjustmentsHorizontalSolid } from '@ng-icons/heroicons/solid';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';
import {
  phosphorFloppyDisk,
  phosphorArrowCounterClockwise,
  phosphorCornersOut,
} from '@ng-icons/phosphor-icons/regular';
import { DecimalPipe } from '@angular/common';
import { UiService } from './services/ui.service';
import { timeout } from 'rxjs';

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
      phosphorCornersOut,
    }),
  ],
})
export class AppComponent {
  private uiService = inject(UiService);

  title = 'bingetap';
  isDarkMode = signal<boolean>(false);
  tapCount = signal<number>(0);

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

  toggleFullScreen() {
    this.uiService.toggleFullscreen();
  }

  onTap(){
    this.tapCount.set(this.tapCount() + 1);
  }

  onReset(){
    this.tapCount.set(0);
  }
}
