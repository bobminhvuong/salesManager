import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouDebitComponent } from './cou-debit.component';

describe('CouDebitComponent', () => {
  let component: CouDebitComponent;
  let fixture: ComponentFixture<CouDebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouDebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
