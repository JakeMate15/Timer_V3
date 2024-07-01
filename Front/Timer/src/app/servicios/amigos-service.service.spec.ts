import { TestBed } from '@angular/core/testing';

import { AmigosServiceService } from './amigos-service.service';

describe('AmigosServiceService', () => {
  let service: AmigosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmigosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
