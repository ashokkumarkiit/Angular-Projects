import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAnalyticsComponent } from './map-analytics.component';

describe('MapAnalyticsComponent', () => {
  let component: MapAnalyticsComponent;
  let fixture: ComponentFixture<MapAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
