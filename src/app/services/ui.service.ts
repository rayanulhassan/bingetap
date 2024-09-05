import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private readonly main_content_element_id: string = 'app-root-content';

  constructor() {}

  toggleFullscreen(): void {
    const elem = document.getElementById(this.main_content_element_id);

    if (elem) {
      if (!document.fullscreenElement) {
        elem.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
}
