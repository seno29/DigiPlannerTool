import { TestBed } from '@angular/core/testing';

import { ScalingService } from './scaling.service';

describe('ScalingService', () => {
  let service: ScalingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScalingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
