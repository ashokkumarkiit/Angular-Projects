import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapReportComponent } from './world-map-report.component';

describe('WorldMapReportComponent', () => {
  let component: WorldMapReportComponent;
  let fixture: ComponentFixture<WorldMapReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldMapReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
