import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartConfirmedComponent } from './line-chart-confirmed.component';

describe('LineChartConfirmedComponent', () => {
  let component: LineChartConfirmedComponent;
  let fixture: ComponentFixture<LineChartConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
