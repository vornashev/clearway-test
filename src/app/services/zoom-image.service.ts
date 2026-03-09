import { DOCUMENT } from "@angular/common";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ZoomImageService {
	private readonly document = inject(DOCUMENT);

	readonly zoom = signal(1);

	constructor() {
		this.document.addEventListener("keydown", (event: KeyboardEvent) => {
			if (event.key === "+" || event.key === "=") this.zoomIn();
			if (event.key === "-") this.zoomOut();
		});
	}

	zoomIn() {
		this.zoom.update((value) => parseFloat((value + 0.1).toFixed(1)));
	}

	zoomOut() {
		this.zoom.update((value) => parseFloat((value - 0.1).toFixed(1)));
	}
}
