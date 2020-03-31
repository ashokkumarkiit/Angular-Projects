import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAnalyticsComponent } from './health-analytics.component';

describe('HealthAnalyticsComponent', () => {
  let component: HealthAnalyticsComponent;
  let fixture: ComponentFixture<HealthAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
