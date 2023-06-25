import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleViewComponent } from './puzzle-view.component';

describe('PuzzleViewComponent', () => {
  let component: PuzzleViewComponent;
  let fixture: ComponentFixture<PuzzleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleViewComponent]
    });
    fixture = TestBed.createComponent(PuzzleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
