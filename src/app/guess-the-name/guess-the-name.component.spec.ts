import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheNameComponent } from './guess-the-name.component';

describe('GuessTheNameComponent', () => {
  let component: GuessTheNameComponent;
  let fixture: ComponentFixture<GuessTheNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessTheNameComponent]
    });
    fixture = TestBed.createComponent(GuessTheNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
