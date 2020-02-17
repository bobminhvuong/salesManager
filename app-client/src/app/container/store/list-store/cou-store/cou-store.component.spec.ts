import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouStoreComponent } from './cou-store.component';

describe('CouStoreComponent', () => {
  let component: CouStoreComponent;
  let fixture: ComponentFixture<CouStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
