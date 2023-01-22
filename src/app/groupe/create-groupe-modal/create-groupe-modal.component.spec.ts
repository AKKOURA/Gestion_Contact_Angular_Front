import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupeModalComponent } from './create-groupe-modal.component';

describe('CreateGroupeModalComponent', () => {
  let component: CreateGroupeModalComponent;
  let fixture: ComponentFixture<CreateGroupeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
