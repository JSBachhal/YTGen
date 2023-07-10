import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadimagesComponent } from './loadimages.component';

describe('LoadimagesComponent', () => {
  let component: LoadimagesComponent;
  let fixture: ComponentFixture<LoadimagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadimagesComponent]
    });
    fixture = TestBed.createComponent(LoadimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
