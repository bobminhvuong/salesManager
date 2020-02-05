import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouGroupProductComponent } from './cou-group-product.component';

describe('CouGroupProductComponent', () => {
  let component: CouGroupProductComponent;
  let fixture: ComponentFixture<CouGroupProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouGroupProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouGroupProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
