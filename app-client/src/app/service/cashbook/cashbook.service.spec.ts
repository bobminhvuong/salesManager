import { TestBed } from '@angular/core/testing';

import { CashbookService } from './cashbook.service';

describe('CashbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashbookService = TestBed.get(CashbookService);
    expect(service).toBeTruthy();
  });
});
