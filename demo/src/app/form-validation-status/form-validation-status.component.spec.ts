import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationStatusComponent } from './form-validation-status.component';

describe('FormValidationStatusComponent', () => {
  let component: FormValidationStatusComponent;
  let fixture: ComponentFixture<FormValidationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
