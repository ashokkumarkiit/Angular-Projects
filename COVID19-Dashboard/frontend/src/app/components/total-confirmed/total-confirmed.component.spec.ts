import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalConfirmedComponent } from './total-confirmed.component';

describe('TotalConfirmedComponent', () => {
  let component: TotalConfirmedComponent;
  let fixture: ComponentFixture<TotalConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
