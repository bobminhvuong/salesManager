import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouWarehouseComponent } from './cou-warehouse.component';

describe('CouWarehouseComponent', () => {
  let component: CouWarehouseComponent;
  let fixture: ComponentFixture<CouWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
