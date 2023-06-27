import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheFlagComponent } from './guess-the-flag.component';

describe('GuessTheFlagComponent', () => {
  let component: GuessTheFlagComponent;
  let fixture: ComponentFixture<GuessTheFlagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessTheFlagComponent]
    });
    fixture = TestBed.createComponent(GuessTheFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
