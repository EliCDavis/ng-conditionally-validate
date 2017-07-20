import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationComponent } from './inspiration.component';

describe('InspirationComponent', () => {
  let component: InspirationComponent;
  let fixture: ComponentFixture<InspirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspirationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
