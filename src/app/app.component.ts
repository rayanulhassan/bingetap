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
import { NzModalService } from 'ng-zorro-antd/modal';
import { ButtonComponent } from './components/ui/button/button.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIconComponent, DecimalPipe, ButtonComponent],
  templateUrl: './app.component.html',
  providers: [
    NzModalService,
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
  private modelService = inject(NzModalService);

  title = 'bingetap';
  isDarkMode = signal<boolean>(false);
  tapCount = signal<number>(0);
  footerLinks = signal<{ title: string; url: string }[]>([
    { title: 'Contact Developer', url: 'mailto:rayanulhassan@outlook.com' },
    { title: 'Github', url: 'https://github.com/rayanulhassan/bingetap' },
    {
      title: 'Hire Developer',
      url: 'https://www.upwork.com/freelancers/hassanr33?mp_source=share',
    },
    // {title: 'Buy me a Coffee', url: ''},
  ]);
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

      this.openSettingsModal()

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

  onTap() {
    this.tapCount.set(this.tapCount() + 1);
  }

  onReset() {
    this.tapCount.set(0);
  }

  openSettingsModal() {
    this.modelService.create({
      nzTitle: 'Settings',
      nzContent: SettingsModalComponent,
      nzFooter: null,
      
    });
  }
}
