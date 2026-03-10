import { Injectable, signal } from '@angular/core';

import { Annotation } from '../../../core/models/annotation.model';
import { Position } from '../../../core/models/position.model';
import { AddAnnotationResult } from '../components/add-annotation/add-annotation.component';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  private readonly _store = signal<Record<number, Annotation[]>>({});
  readonly store = this._store.asReadonly();

  readonly addPosition = signal<Position | null>(null);

  getPageAnnotations(pageNumber: number) {
    return this.store()[pageNumber] ?? [];
  }

  openAdding(position: Position) {
    this.addPosition.set(position);
  }

  closeAdding() {
    this.addPosition.set(null);
  }

  add(pageNumber: number, result: AddAnnotationResult) {
    const position = this.addPosition();

    if (position) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        text: result.text,
        imageUrl: result.imageUrl,
        x: position.x,
        y: position.y,
      };

      this._store.update(store => ({
        ...store,
        [pageNumber]: [...(store[pageNumber] ?? []), newAnnotation],
      }));

      this.closeAdding();
    }
  }

  delete(pageNumber: number, id: string) {
    this._store.update(store => ({
      ...store,
      [pageNumber]: (store[pageNumber] ?? []).filter(a => a.id !== id),
    }));
  }

  move(pageNumber: number, id: string, position: Position) {
    this._store.update(store => ({
      ...store,
      [pageNumber]: (store[pageNumber] ?? []).map(a =>
        a.id === id ? { ...a, ...position } : a
      ),
    }));
  }
}
