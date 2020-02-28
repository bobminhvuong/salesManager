import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWarehouseDetailComponent } from './report-warehouse-detail.component';

describe('ReportWarehouseDetailComponent', () => {
  let component: ReportWarehouseDetailComponent;
  let fixture: ComponentFixture<ReportWarehouseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportWarehouseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWarehouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
