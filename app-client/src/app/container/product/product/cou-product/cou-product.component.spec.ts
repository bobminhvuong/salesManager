import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouProductComponent } from './cou-product.component';

describe('CouProductComponent', () => {
  let component: CouProductComponent;
  let fixture: ComponentFixture<CouProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
