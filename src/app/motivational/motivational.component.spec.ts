import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationalComponent } from './motivational.component';

describe('MotivationalComponent', () => {
  let component: MotivationalComponent;
  let fixture: ComponentFixture<MotivationalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotivationalComponent]
    });
    fixture = TestBed.createComponent(MotivationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
