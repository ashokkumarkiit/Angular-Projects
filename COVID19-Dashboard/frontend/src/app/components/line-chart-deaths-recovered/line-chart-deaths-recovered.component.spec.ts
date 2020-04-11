import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartDeathsRecoveredComponent } from './line-chart-deaths-recovered.component';

describe('LineChartDeathsRecoveredComponent', () => {
  let component: LineChartDeathsRecoveredComponent;
  let fixture: ComponentFixture<LineChartDeathsRecoveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartDeathsRecoveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartDeathsRecoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
