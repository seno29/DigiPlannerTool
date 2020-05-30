import { TestBed } from '@angular/core/testing';

import { AdminSocketService } from './admin-socket.service';

describe('AdminSocketService', () => {
  let service: AdminSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
