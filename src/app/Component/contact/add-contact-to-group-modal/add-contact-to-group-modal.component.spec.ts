import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactToGroupModalComponent } from './add-contact-to-group-modal.component';

describe('AddContactToGroupModalComponent', () => {
  let component: AddContactToGroupModalComponent;
  let fixture: ComponentFixture<AddContactToGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactToGroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactToGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
