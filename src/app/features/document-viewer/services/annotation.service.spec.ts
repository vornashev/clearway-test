import { TestBed } from '@angular/core/testing';

import { AnnotationService } from './annotation.service';

describe('AnnotationService', () => {
  let service: AnnotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationService);
    let time = 0;
    spyOn(Date, 'now').and.callFake(() => time++);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageAnnotations', () => {
    it('should return empty array for unknown page', () => {
      expect(service.getPageAnnotations(99)).toEqual([]);
    });

    it('should return annotations for the given page', () => {
      service.add(1, { x: 10, y: 20 }, { text: 'hello' });

      expect(service.getPageAnnotations(1)).toHaveSize(1);
      expect(service.getPageAnnotations(1)[0].text).toBe('hello');
    });

    it('should not return annotations from other pages', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'page1' });

      service.add(2, { x: 0, y: 0 }, { text: 'page2' });

      expect(service.getPageAnnotations(1)).toHaveSize(1);
      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('add', () => {
    it('should add annotation with correct text and position', () => {
      service.add(1, { x: 10, y: 20 }, { text: 'test' });

      const result = service.getPageAnnotations(1);
      expect(result).toHaveSize(1);
      expect(result[0].text).toBe('test');
      expect(result[0].x).toBe(10);
      expect(result[0].y).toBe(20);
    });

    it('should add annotation with imageUrl', () => {
      service.add(
        1,
        { x: 0, y: 0 },
        { text: 'img', imageUrl: 'data:image/png;base64,abc' }
      );

      expect(service.getPageAnnotations(1)[0].imageUrl).toBe(
        'data:image/png;base64,abc'
      );
    });

    it('should append annotation to existing ones', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'first' });

      service.add(1, { x: 0, y: 0 }, { text: 'second' });

      expect(service.getPageAnnotations(1)).toHaveSize(2);
    });

    it('should not mutate other pages', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'page1' });

      service.add(2, { x: 0, y: 0 }, { text: 'page2' });

      service.add(1, { x: 0, y: 0 }, { text: 'page1 again' });

      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('delete', () => {
    it('should remove annotation by id', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'first' });

      service.add(1, { x: 0, y: 0 }, { text: 'second' });

      const [first] = service.getPageAnnotations(1);
      service.delete(1, first.id);

      const result = service.getPageAnnotations(1);
      expect(result).toHaveSize(1);
      expect(result[0].text).toBe('second');
    });

    it('should do nothing when id does not exist', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'test' });

      service.delete(1, 'nonexistent');

      expect(service.getPageAnnotations(1)).toHaveSize(1);
    });

    it('should not affect other pages', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'page1' });

      service.add(2, { x: 0, y: 0 }, { text: 'page2' });

      const [annotation] = service.getPageAnnotations(1);
      service.delete(1, annotation.id);

      expect(service.getPageAnnotations(2)).toHaveSize(1);
    });
  });

  describe('move', () => {
    it('should update position of the annotation', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'test' });

      const [annotation] = service.getPageAnnotations(1);
      service.move(1, annotation.id, { x: 100, y: 200 });

      const result = service.getPageAnnotations(1);
      expect(result[0].x).toBe(100);
      expect(result[0].y).toBe(200);
    });

    it('should not change other fields', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'hello', imageUrl: 'img.png' });

      const [annotation] = service.getPageAnnotations(1);
      service.move(1, annotation.id, { x: 50, y: 50 });

      const result = service.getPageAnnotations(1);
      expect(result[0].text).toBe('hello');
      expect(result[0].imageUrl).toBe('img.png');
    });

    it('should not affect other annotations on the same page', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'first' });

      service.add(1, { x: 0, y: 0 }, { text: 'second' });

      const [first] = service.getPageAnnotations(1);
      service.move(1, first.id, { x: 99, y: 99 });

      const other = service
        .getPageAnnotations(1)
        .find(a => a.text === 'second')!;
      expect(other.x).toBe(0);
      expect(other.y).toBe(0);
    });

    it('should not affect other pages', () => {
      service.add(1, { x: 0, y: 0 }, { text: 'page1' });

      service.add(2, { x: 0, y: 0 }, { text: 'page2' });

      const [annotation] = service.getPageAnnotations(1);
      service.move(1, annotation.id, { x: 99, y: 99 });

      expect(service.getPageAnnotations(2)[0].x).toBe(0);
    });
  });
});
