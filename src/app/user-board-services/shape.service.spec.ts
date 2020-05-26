import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShapeService } from './shape.service';

describe('ShapeService', () => {
  let service: ShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ShapeService ]
    });
    service = TestBed.inject(ShapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
