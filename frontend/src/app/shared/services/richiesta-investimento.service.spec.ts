import { TestBed } from '@angular/core/testing';

import { RichiestaInvestimentoService } from './richiesta-investimento.service';

describe('RichiestaInvestimentoService', () => {
  let service: RichiestaInvestimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichiestaInvestimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
