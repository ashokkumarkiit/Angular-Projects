import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidPredictionComponent } from './covid-prediction.component';

describe('CovidPredictionComponent', () => {
  let component: CovidPredictionComponent;
  let fixture: ComponentFixture<CovidPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
