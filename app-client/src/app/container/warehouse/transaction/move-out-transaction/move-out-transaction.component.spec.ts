import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOutTransactionComponent } from './move-out-transaction.component';

describe('MoveOutTransactionComponent', () => {
  let component: MoveOutTransactionComponent;
  let fixture: ComponentFixture<MoveOutTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveOutTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveOutTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
