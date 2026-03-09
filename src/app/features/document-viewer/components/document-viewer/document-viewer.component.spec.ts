import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DocumentViewerComponent } from './document-viewer.component';

describe('DocumentViewerComponent', () => {
  let component: DocumentViewerComponent;
  let fixture: ComponentFixture<DocumentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentViewerComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
