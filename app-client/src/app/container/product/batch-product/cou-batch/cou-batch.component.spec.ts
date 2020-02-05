import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouBatchComponent } from './cou-batch.component';

describe('CouBatchComponent', () => {
  let component: CouBatchComponent;
  let fixture: ComponentFixture<CouBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
