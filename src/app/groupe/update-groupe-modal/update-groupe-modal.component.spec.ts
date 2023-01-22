import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupeModalComponent } from './update-groupe-modal.component';

describe('UpdateGroupeModalComponent', () => {
  let component: UpdateGroupeModalComponent;
  let fixture: ComponentFixture<UpdateGroupeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGroupeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGroupeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
