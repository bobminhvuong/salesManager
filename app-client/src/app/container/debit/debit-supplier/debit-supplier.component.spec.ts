import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitSupplierComponent } from './debit-supplier.component';

describe('DebitSupplierComponent', () => {
  let component: DebitSupplierComponent;
  let fixture: ComponentFixture<DebitSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
