import { TestBed } from '@angular/core/testing';

import { PolizzaService } from './polizza.service';

describe('PolizzaService', () => {
  let service: PolizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
