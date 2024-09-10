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
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { UiService } from './services/ui.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ButtonComponent } from './components/ui/button/button.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { Store } from '@ngrx/store';
import {
  selectCounter,
  selectIsAutosaveEnabled,
} from './state/app/app.selectors';
import {
  DisableAutosave,
  EnableAutosave,
  GetDataFromLocalstorage,
  IncrementCounter,
  ResetCounter,
} from './state/app/app.actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIconComponent, DecimalPipe, ButtonComponent, AsyncPipe, NgClass],
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
  private store = inject(Store);

  firstTapTime: number | null = null;

  isDarkMode = signal<boolean>(false);
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

  isAutosaveEnabled = toSignal(this.store.select(selectIsAutosaveEnabled), {
    initialValue: true,
  });
  counter = toSignal(this.store.select(selectCounter), {
    initialValue: 0,
  });
  tapSpeed = computed<number>(() => {
    const counter = this.counter();
    if (this.firstTapTime === null) return 0;
    const currentTime = new Date().getTime()
    const timeElapsed = (currentTime - this.firstTapTime) / 1000 / 60; // Convert milliseconds to minutes
    return Math.round(counter / timeElapsed);
  });
  autosaveButtonText = computed<string>(() => {
    return this.isAutosaveEnabled() ? 'Disable Autosave' : 'Enable Autosave';
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

      this.store.dispatch(GetDataFromLocalstorage());
    });
  }

  toggleFullScreen() {
    this.uiService.toggleFullscreen();
  }

  onTap() {
    if (this.firstTapTime === null) this.firstTapTime = new Date().getTime();
    this.store.dispatch(IncrementCounter());
  }

  onReset() {
    this.store.dispatch(ResetCounter());
    this.firstTapTime = null
  }

  openSettingsModal() {
    this.modelService.create({
      nzTitle: 'Settings',
      nzContent: SettingsModalComponent,
      nzFooter: null,
      nzNoAnimation: true,
    });
  }

  updateAutosaveSetting(enableSetting: boolean) {
    if (!enableSetting) this.store.dispatch(DisableAutosave());
    else this.store.dispatch(EnableAutosave());
  }
}
