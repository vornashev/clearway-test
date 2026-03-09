import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	output,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Position } from "../../models/position.model";

@Component({
	selector: "app-add-annotation",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./add-annotation.component.html",
	styleUrl: "./add-annotation.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[style.left.px]": "positionX()",
		"[style.top.px]": "positionY()",
	},
})
export class AddAnnotationComponent {
	readonly position = input<Position>({ x: 0, y: 0 });

	readonly added = output<string>();
	readonly closed = output();

	readonly positionX = computed(() => this.position().x);
	readonly positionY = computed(() => this.position().y);

	readonly textControl = new FormControl("");

	save(event: MouseEvent | Event) {
		event.stopPropagation();
		const text = this.textControl.value;

		if (text) {
			this.added.emit(text);
		}
	}

	close(event: MouseEvent) {
		event.stopPropagation();
		this.closed.emit();
	}
}
