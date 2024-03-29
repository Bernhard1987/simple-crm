import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleNoteComponent } from './view-single-note.component';

describe('ViewSingleNoteComponent', () => {
  let component: ViewSingleNoteComponent;
  let fixture: ComponentFixture<ViewSingleNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSingleNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSingleNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
