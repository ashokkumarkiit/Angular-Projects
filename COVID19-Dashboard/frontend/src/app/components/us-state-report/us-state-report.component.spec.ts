import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsStateReportComponent } from './us-state-report.component';

describe('UsStateReportComponent', () => {
  let component: UsStateReportComponent;
  let fixture: ComponentFixture<UsStateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsStateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsStateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
