import { Injectable, signal } from '@angular/core';
import { Annotation } from '../models/annotation.model';
import { Position } from '../models/position.model';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  private readonly store = signal<Record<number, Annotation[]>>({});

  getListByPageNumber(pageNumber: number) {
    return this.store()[pageNumber] ?? [];
  }

  add(pageNumber: number, newAnnotation: Annotation) {
    this.store.update(store => ({
      ...store,
      [pageNumber]: [...(store[pageNumber] ?? []), newAnnotation],
    }));
  }

  delete(pageNumber: number, id: string) {
    this.store.update(store => ({
      ...store,
      [pageNumber]: (store[pageNumber] ?? []).filter(a => a.id !== id),
    }));
  }

  move(pageNumber: number, id: string, position: Position) {
    this.store.update(store => ({
      ...store,
      [pageNumber]: (store[pageNumber] ?? []).map(a =>
        a.id === id ? { ...a, ...position } : a
      ),
    }));
  }
}
