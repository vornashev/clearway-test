import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { DocumentDto } from '../../../../core/dto';
import { ZoomImageService } from '../../services/zoom-image.service';
import { PercentagePipe } from '../../../../shared/pipes/percentage.pipe';
import { DocumentPageComponent } from '../document-page/document-page.component';
import { AnnotationService } from '../../services/annotation.service';
import { DocumentModel } from '../../../../core/models/document.model';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PercentagePipe, MatIconModule, DocumentPageComponent],
})
export class DocumentViewerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly annotationService = inject(AnnotationService);
  readonly zoomImageService = inject(ZoomImageService);

  private data = toSignal(this.route.data);

  readonly document = computed(() => this.data()?.['document'] as DocumentDto);

  readonly documentName = computed(() => this.document()?.name);
  readonly pageList = computed(() => this.document()?.pages);

  viewResult() {
    const doc = this.document();
    const result: DocumentModel = {
      name: doc.name,
      pages: doc.pages.map(page => ({
        ...page,
        annotations: this.annotationService.getPageAnnotations(page.number),
      })),
    };

    console.log(result);
  }
}
