import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from "@angular/core";

import { PageDto } from "../../models";
import { ZoomImageDirective } from "../../directives/zoom-image.directive";
import { AddAnnotationComponent } from "../add-annotation/add-annotation.component";
import { Position } from "../../models/position.model";
import { Annotation } from "../../models/annotation.model";
import { AnnotationComponent } from "../annotation/annotation.component";

@Component({
	selector: "app-document-page",
	standalone: true,
	imports: [ZoomImageDirective, AddAnnotationComponent, AnnotationComponent],
	templateUrl: "./document-page.component.html",
	styleUrl: "./document-page.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"(click)": "addAnnotation($event)",
	},
})
export class DocumentPageComponent {
	readonly page = input.required<PageDto>();

	readonly annotationList = signal<Annotation[]>([]);

	readonly addPosition = signal<Position | null>(null);

	saveAnnotation(text: string) {
		const position = this.addPosition();
		if (position) {
			const { x, y } = position;
			const newAnnotation: Annotation = {
				id: Date.now().toString(),
				pageNumber: this.page().number,
				text,
				x,
				y,
			};

			this.annotationList.update((list) => [...list, newAnnotation]);
			this.addPosition.set(null);
		}
	}

	addAnnotation(event: PointerEvent) {
		console.log(event);
		if (this.addPosition()) {
			return;
		}

		const { offsetX, offsetY } = event;
		this.addPosition.set({ x: offsetX, y: offsetY });
	}

	deleteAnnotation(annotation: Annotation) {
		this.annotationList.update((list) =>
			list.filter((item) => item.id !== annotation.id),
		);
	}
}
