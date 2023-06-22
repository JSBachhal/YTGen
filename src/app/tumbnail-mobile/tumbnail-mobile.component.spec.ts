import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbnailMobileComponent } from './tumbnail-mobile.component';

describe('TumbnailMobileComponent', () => {
  let component: TumbnailMobileComponent;
  let fixture: ComponentFixture<TumbnailMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TumbnailMobileComponent]
    });
    fixture = TestBed.createComponent(TumbnailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
