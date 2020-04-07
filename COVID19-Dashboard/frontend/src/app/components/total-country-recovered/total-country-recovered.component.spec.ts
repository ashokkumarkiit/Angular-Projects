import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountryRecoveredComponent } from './total-country-recovered.component';

describe('TotalCountryRecoveredComponent', () => {
  let component: TotalCountryRecoveredComponent;
  let fixture: ComponentFixture<TotalCountryRecoveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountryRecoveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountryRecoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
