import { TestBed } from '@angular/core/testing';

import { RankingsServiceService } from './rankings-service.service';

describe('RankingsServiceService', () => {
  let service: RankingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
