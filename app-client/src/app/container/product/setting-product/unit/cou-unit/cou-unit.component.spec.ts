import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouUnitComponent } from './cou-unit.component';

describe('CouUnitComponent', () => {
  let component: CouUnitComponent;
  let fixture: ComponentFixture<CouUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
