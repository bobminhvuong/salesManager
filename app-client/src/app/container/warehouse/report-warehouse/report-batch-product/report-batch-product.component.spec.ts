import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBatchProductComponent } from './report-batch-product.component';

describe('ReportBatchProductComponent', () => {
  let component: ReportBatchProductComponent;
  let fixture: ComponentFixture<ReportBatchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBatchProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBatchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
