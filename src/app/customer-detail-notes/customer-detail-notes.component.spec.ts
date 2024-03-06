import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailNotesComponent } from './customer-detail-notes.component';

describe('CustomerDetailNotesComponent', () => {
  let component: CustomerDetailNotesComponent;
  let fixture: ComponentFixture<CustomerDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
