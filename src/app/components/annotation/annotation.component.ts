import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	output,
} from "@angular/core";

import { MatIconModule } from "@angular/material/icon";
import { Annotation } from "../../models/annotation.model";
import { ZoomImageService } from "../../services/zoom-image.service";

@Component({
	selector: "app-annotation",
	standalone: true,
	imports: [MatIconModule],
	templateUrl: "./annotation.component.html",
	styleUrl: "./annotation.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[style.left.px]": "positionX()",
		"[style.top.px]": "positionY()",
	},
})
export class AnnotationComponent {
  private readonly zoomImageService = inject(ZoomImageService);

	readonly data = input.required<Annotation>();

	readonly deleted = output();

	readonly text = computed(() => this.data().text);
	readonly imageUrl = computed(() => this.data().imageUrl);
  readonly zoom = this.zoomImageService.zoom;

	readonly positionX = computed(() => this.zoom() * this.data().x);
	readonly positionY = computed(() => this.zoom() * this.data().y);

	deleteAnnotation(event: MouseEvent) {
		event.stopPropagation();
		this.deleted.emit();
	}
}
