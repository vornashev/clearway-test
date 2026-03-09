import { TestBed } from '@angular/core/testing';

import { Annotation } from '../../../core/models/annotation.model';
import { AnnotationService } from './annotation.service';

const makeAnnotation = (
  id: string,
  overrides: Partial<Annotation> = {}
): Annotation => ({
  id,
  text: 'test',
  x: 10,
  y: 20,
  ...overrides,
});

describe('AnnotationService', () => {
  let service: AnnotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageAnnotations', () => {
    it('should return empty array for unknown page', () => {
      expect(service.getPageAnnotations(99)).toEqual([]);
    });

    it('should return annotations for the given page', () => {
      const annotation = makeAnnotation('1');
      service.add(1, annotation);

      expect(service.getPageAnnotations(1)).toEqual([annotation]);
    });

    it('should not return annotations from other pages', () => {
      service.add(1, makeAnnotation('1'));
      service.add(2, makeAnnotation('2'));

      expect(service.getPageAnnotations(1)).toHaveSize(1);
      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('add', () => {
    it('should add annotation to the page', () => {
      const annotation = makeAnnotation('1');
      service.add(1, annotation);

      expect(service.getPageAnnotations(1)).toContain(annotation);
    });

    it('should append annotation to existing ones', () => {
      service.add(1, makeAnnotation('1'));
      service.add(1, makeAnnotation('2'));

      expect(service.getPageAnnotations(1)).toHaveSize(2);
    });

    it('should not mutate other pages', () => {
      service.add(1, makeAnnotation('1'));
      service.add(2, makeAnnotation('2'));
      service.add(1, makeAnnotation('3'));

      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('delete', () => {
    it('should remove annotation by id', () => {
      service.add(1, makeAnnotation('1'));
      service.add(1, makeAnnotation('2'));

      service.delete(1, '1');

      const result = service.getPageAnnotations(1);
      expect(result).toHaveSize(1);
      expect(result[0].id).toBe('2');
    });

    it('should do nothing when id does not exist', () => {
      service.add(1, makeAnnotation('1'));

      service.delete(1, 'nonexistent');

      expect(service.getPageAnnotations(1)).toHaveSize(1);
    });

    it('should not affect other pages', () => {
      service.add(1, makeAnnotation('1'));
      service.add(2, makeAnnotation('1'));

      service.delete(1, '1');

      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('move', () => {
    it('should update position of the annotation', () => {
      service.add(1, makeAnnotation('1', { x: 0, y: 0 }));

      service.move(1, '1', { x: 100, y: 200 });

      const result = service.getPageAnnotations(1);
      expect(result[0].x).toBe(100);
      expect(result[0].y).toBe(200);
    });

    it('should not change other fields', () => {
      const annotation = makeAnnotation('1', {
        text: 'hello',
        imageUrl: 'img.png',
      });
      service.add(1, annotation);

      service.move(1, '1', { x: 50, y: 50 });

      const result = service.getPageAnnotations(1);
      expect(result[0].text).toBe('hello');
      expect(result[0].imageUrl).toBe('img.png');
    });

    it('should not affect other annotations on the same page', () => {
      service.add(1, makeAnnotation('1', { x: 0, y: 0 }));
      service.add(1, makeAnnotation('2', { x: 0, y: 0 }));

      service.move(1, '1', { x: 99, y: 99 });

      const other = service.getPageAnnotations(1).find(a => a.id === '2')!;
      expect(other.x).toBe(0);
      expect(other.y).toBe(0);
    });

    it('should not affect other pages', () => {
      service.add(1, makeAnnotation('1', { x: 0, y: 0 }));
      service.add(2, makeAnnotation('1', { x: 0, y: 0 }));

      service.move(1, '1', { x: 99, y: 99 });

      expect(service.getPageAnnotations(2)[0].x).toBe(0);
    });
  });
});
