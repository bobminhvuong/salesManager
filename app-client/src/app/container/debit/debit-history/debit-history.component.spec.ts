import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitHistoryComponent } from './debit-history.component';

describe('DebitHistoryComponent', () => {
  let component: DebitHistoryComponent;
  let fixture: ComponentFixture<DebitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
