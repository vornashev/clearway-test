import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	output,
} from "@angular/core";

import { Position } from "../../models/position.model";
import { Annotation } from "../../models/annotation.model";

@Component({
	selector: "app-annotation",
	standalone: true,
	imports: [],
	templateUrl: "./annotation.component.html",
	styleUrl: "./annotation.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[style.left.px]": "positionX()",
		"[style.top.px]": "positionY()",
	},
})
export class AnnotationComponent {
	readonly data = input.required<Annotation>();

	readonly deleted = output();

	readonly positionX = computed(() => this.data().x);
	readonly positionY = computed(() => this.data().y);
	readonly text = computed(() => this.data().text);
}
