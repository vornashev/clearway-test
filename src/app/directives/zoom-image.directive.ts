import {
	AfterViewInit,
	Directive,
	effect,
	ElementRef,
	inject,
} from "@angular/core";

import { ZoomImageService } from "../services/zoom-image.service";

@Directive({
	selector: "[appZoomImage]",
	standalone: true,
})
export class ZoomImageDirective implements AfterViewInit {
	private readonly elRef = inject<ElementRef<HTMLImageElement>>(ElementRef);
	private readonly zoomImageService = inject(ZoomImageService);

	private readonly nativeElement = this.elRef.nativeElement;

	readonly zoom = this.zoomImageService.zoom;
	private cacheWidth: number | null = null;

	constructor() {
		effect(() => {
			this.renderByZoom(this.zoom());
		});
	}

	ngAfterViewInit(): void {
		if (this.nativeElement.complete) {
			this.cacheWidth = this.nativeElement.clientWidth;
		} else {
			this.nativeElement.addEventListener(
				"load",
				() => {
					this.cacheWidth = this.nativeElement.clientWidth;
					this.renderByZoom(this.zoom());
				},
				{ once: true },
			);
		}
	}

	renderByZoom(zoom: number) {
		if (this.cacheWidth) {
			const newWidth = this.cacheWidth * zoom;
			this.nativeElement.style.width = `${newWidth}px`;
		}
	}
}
