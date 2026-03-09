import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Position } from '../../../../core/models/position.model';
import { MatIconModule } from '@angular/material/icon';

export interface AddAnnotationResult {
  text: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-add-annotation',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './add-annotation.component.html',
  styleUrl: './add-annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.left.px]': 'positionX()',
    '[style.top.px]': 'positionY()',
  },
})
export class AddAnnotationComponent {
  readonly position = input<Position>({ x: 0, y: 0 });
  readonly zoom = input<number>(1);

  readonly added = output<AddAnnotationResult>();
  readonly closed = output();

  readonly positionX = computed(() => this.zoom() * this.position().x);
  readonly positionY = computed(() => this.zoom() * this.position().y);

  readonly textControl = new FormControl('');
  readonly imageUrl = signal<string | undefined>(undefined);

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  save(event: MouseEvent | Event) {
    event.stopPropagation();
    const text = this.textControl.value?.trim();
    const imageUrl = this.imageUrl();

    if (text || imageUrl) {
      this.added.emit({ text: text ?? '', imageUrl });
    }
  }

  close(event: MouseEvent) {
    event.stopPropagation();
    this.closed.emit();
  }
}
