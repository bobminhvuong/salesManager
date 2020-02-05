import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouTypePackComponent } from './cou-type-pack.component';

describe('CouTypePackComponent', () => {
  let component: CouTypePackComponent;
  let fixture: ComponentFixture<CouTypePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouTypePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouTypePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
