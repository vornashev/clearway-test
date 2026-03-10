import { Directive, ElementRef, inject, input, output, DOCUMENT } from '@angular/core';

import { Position } from '../../../core/models/position.model';


@Directive({
  selector: '[appDraggable]',
  standalone: true,
  host: {
    '(mousedown)': 'onMouseDown($event)',
  },
})
export class DraggableDirective {
  readonly appDraggableZoom = input<number>(1);
  readonly positionChange = output<Position>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private calcPosition(event: MouseEvent): Position {
    const el = this.el.nativeElement;
    const parent = el.offsetParent as HTMLElement;
    const parentRect = parent.getBoundingClientRect();

    const maxX = parentRect.width - el.offsetWidth;
    const maxY = parentRect.height - el.offsetHeight;

    const x = this.clamp(
      event.clientX - parentRect.left - this.offsetX,
      0,
      maxX
    );
    const y = this.clamp(
      event.clientY - parentRect.top - this.offsetY,
      0,
      maxY
    );

    return { x, y };
  }

  private readonly onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const { x, y } = this.calcPosition(event);

    this.el.nativeElement.style.left = `${x}px`;
    this.el.nativeElement.style.top = `${y}px`;
  };

  private readonly onMouseUp = (event: MouseEvent) => {
    if (!this.isDragging) return;

    this.isDragging = false;

    const zoom = this.appDraggableZoom();
    const { x, y } = this.calcPosition(event);
    this.positionChange.emit({ x: x / zoom, y: y / zoom });

    this.document.removeEventListener('mousemove', this.onMouseMove);
    this.document.removeEventListener('mouseup', this.onMouseUp);
  };

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = true;

    const rect = this.el.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    this.document.addEventListener('mousemove', this.onMouseMove);
    this.document.addEventListener('mouseup', this.onMouseUp);
  }
}
