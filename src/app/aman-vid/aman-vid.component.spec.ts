import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmanVidComponent } from './aman-vid.component';

describe('AmanVidComponent', () => {
  let component: AmanVidComponent;
  let fixture: ComponentFixture<AmanVidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmanVidComponent]
    });
    fixture = TestBed.createComponent(AmanVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
