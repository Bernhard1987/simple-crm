import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserDataComponent } from './dialog-edit-user-data.component';

describe('DialogEditUserDataComponent', () => {
  let component: DialogEditUserDataComponent;
  let fixture: ComponentFixture<DialogEditUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
