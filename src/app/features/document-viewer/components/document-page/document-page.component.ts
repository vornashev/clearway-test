import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { PageDto } from '../../../../core/dto';
import { ZoomImageDirective } from '../../directives/zoom-image.directive';
import { DraggableDirective } from '../../directives/draggable.directive';
import {
  AddAnnotationComponent,
  AddAnnotationResult,
} from '../add-annotation/add-annotation.component';
import { Position } from '../../../../core/models/position.model';
import { Annotation } from '../../../../core/models/annotation.model';
import { AnnotationComponent } from '../annotation/annotation.component';
import { AnnotationService } from '../../services/annotation.service';
import { ZoomImageService } from '../../services/zoom-image.service';

@Component({
  selector: 'app-document-page',
  standalone: true,
  imports: [
    ZoomImageDirective,
    DraggableDirective,
    AddAnnotationComponent,
    AnnotationComponent,
  ],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPageComponent {
  readonly page = input.required<PageDto>();

  private readonly annotationService = inject(AnnotationService);
  readonly zoomService = inject(ZoomImageService);

  readonly addPosition = this.annotationService.addPosition;

  readonly pageNumber = computed(() => this.page().number);
  readonly annotationList = computed(
    () => this.annotationService.store()[this.pageNumber()] ?? []
  );

  saveAnnotation(result: AddAnnotationResult) {
    this.annotationService.add(this.pageNumber(), result);
  }

  openAddAnnotation(event: MouseEvent) {
    if (this.addPosition() || event.target !== event.currentTarget) {
      return;
    }
    const { offsetX, offsetY } = event;
    this.annotationService.openAdding({ x: offsetX, y: offsetY });
  }

  closeAddAnnotation() {
    this.annotationService.closeAdding();
  }

  deleteAnnotation(annotation: Annotation) {
    this.annotationService.delete(this.pageNumber(), annotation.id);
  }

  updateAnnotation(annotation: Annotation, position: Position) {
    this.annotationService.move(this.pageNumber(), annotation.id, position);
  }
}
