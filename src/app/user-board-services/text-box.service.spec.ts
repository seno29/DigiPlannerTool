import { TestBed } from '@angular/core/testing';

import { TextBoxService } from './text-box.service';

describe('TextBoxService', () => {
  let service: TextBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
