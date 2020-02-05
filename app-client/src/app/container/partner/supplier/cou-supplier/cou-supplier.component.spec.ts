import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouSupplierComponent } from './cou-supplier.component';

describe('CouSupplierComponent', () => {
  let component: CouSupplierComponent;
  let fixture: ComponentFixture<CouSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
