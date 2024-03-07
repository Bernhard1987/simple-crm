import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNoteToCustomerComponent } from './dialog-add-note-to-customer.component';

describe('DialogAddNoteToCustomerComponent', () => {
  let component: DialogAddNoteToCustomerComponent;
  let fixture: ComponentFixture<DialogAddNoteToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddNoteToCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddNoteToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
