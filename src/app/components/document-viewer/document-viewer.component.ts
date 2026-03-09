import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { DocumentDto } from "../../models";
import { ZoomImageService } from "../../services/zoom-image.service";
import { PercentagePipe } from "../../pipes/percentage.pipe/percentage.pipe";
import { ZoomImageDirective } from "../../directives/zoom-image.directive";
import { DocumentPageComponent } from "../document-page/document-page.component";

@Component({
	selector: "app-document-viewer",
	standalone: true,
	templateUrl: "./document-viewer.component.html",
	styleUrl: "./document-viewer.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [PercentagePipe, ZoomImageDirective, DocumentPageComponent],
})
export class DocumentViewerComponent {
	private readonly route = inject(ActivatedRoute);
	readonly zoomImageService = inject(ZoomImageService);

	private data = toSignal(this.route.data);

	readonly document = computed(() => this.data()?.["document"] as DocumentDto);

	readonly documentName = computed(() => this.document()?.name);
	readonly pageList = computed(() => this.document()?.pages);
}
