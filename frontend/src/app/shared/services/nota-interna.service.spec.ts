import { TestBed } from '@angular/core/testing';

import { NotaInternaService } from './nota-interna.service';

describe('NotaInternaService', () => {
  let service: NotaInternaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaInternaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
