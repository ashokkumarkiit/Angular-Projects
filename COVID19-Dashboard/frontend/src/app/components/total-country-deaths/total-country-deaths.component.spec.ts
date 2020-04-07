import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountryDeathsComponent } from './total-country-deaths.component';

describe('TotalCountryDeathsComponent', () => {
  let component: TotalCountryDeathsComponent;
  let fixture: ComponentFixture<TotalCountryDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountryDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountryDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
