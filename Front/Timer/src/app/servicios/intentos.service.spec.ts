import { TestBed } from '@angular/core/testing';

import { IntentosService } from './intentos.service';

describe('IntentosService', () => {
  let service: IntentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
