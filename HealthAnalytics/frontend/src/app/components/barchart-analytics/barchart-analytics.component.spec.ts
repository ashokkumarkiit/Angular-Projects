import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartAnalyticsComponent } from './barchart-analytics.component';

describe('BarchartAnalyticsComponent', () => {
  let component: BarchartAnalyticsComponent;
  let fixture: ComponentFixture<BarchartAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
