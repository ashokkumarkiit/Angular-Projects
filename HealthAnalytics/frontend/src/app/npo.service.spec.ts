import { TestBed } from '@angular/core/testing';

import { NpoService } from './npo.service';

describe('NpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NpoService = TestBed.get(NpoService);
    expect(service).toBeTruthy();
  });
});
