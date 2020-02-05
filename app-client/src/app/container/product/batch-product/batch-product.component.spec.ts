import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchProductComponent } from './batch-product.component';

describe('BatchProductComponent', () => {
  let component: BatchProductComponent;
  let fixture: ComponentFixture<BatchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
