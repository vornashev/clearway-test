import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { Annotation } from '../../../../core/models/annotation.model';

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.left.px]': 'positionX()',
    '[style.top.px]': 'positionY()',
  },
})
export class AnnotationComponent {
  readonly data = input.required<Annotation>();
  readonly zoom = input<number>(1);

  readonly deleted = output();

  readonly positionX = computed(() => this.zoom() * this.data().x);
  readonly positionY = computed(() => this.zoom() * this.data().y);

  deleteAnnotation(event: MouseEvent) {
    event.stopPropagation();
    this.deleted.emit();
  }
}
