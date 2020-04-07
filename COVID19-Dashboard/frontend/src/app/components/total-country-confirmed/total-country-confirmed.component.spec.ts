import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountryConfirmedComponent } from './total-country-confirmed.component';

describe('TotalCountryConfirmedComponent', () => {
  let component: TotalCountryConfirmedComponent;
  let fixture: ComponentFixture<TotalCountryConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountryConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountryConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
