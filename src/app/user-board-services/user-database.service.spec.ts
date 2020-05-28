import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserDatabaseService } from './user-database.service';

describe('UserDatabaseService', () => {
  let service: UserDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserDatabaseService,
      ],
    });
    service = TestBed.inject(UserDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
