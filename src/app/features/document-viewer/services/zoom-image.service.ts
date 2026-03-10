import { inject, Injectable, signal, DOCUMENT } from '@angular/core';

const ZOOM_OPTIONS = {
  MAX: 2,
  MIN: 0.1,
};

@Injectable({ providedIn: 'root' })
export class ZoomImageService {
  private readonly document = inject(DOCUMENT);

  readonly zoom = signal(1);

  constructor() {
    this.document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === '+' || event.key === '=') this.zoomIn();
      if (event.key === '-') this.zoomOut();
    });
  }

  zoomIn() {
    if (ZOOM_OPTIONS.MAX > this.zoom()) {
      this.zoom.update(value => parseFloat((value + 0.1).toFixed(1)));
    }
  }

  zoomOut() {
    if (ZOOM_OPTIONS.MIN < this.zoom()) {
      this.zoom.update(value => parseFloat((value - 0.1).toFixed(1)));
    }
  }
}
