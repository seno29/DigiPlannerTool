import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ShapeService } from './shape.service';

describe('ShapeService', () => {
  let injector: TestBed;
  let shapeService: ShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShapeService,
      ],
    });
    injector = getTestBed();
    shapeService = injector.inject(ShapeService);
  });

  it('should be created', () => {
    expect(shapeService).toBeTruthy();
  });

  it(`getBackground() should get the base64 image`, () => {
    shapeService.getBackground('').subscribe( (res) => {
      expect(res).toContain('data:image');
    });
  });
});
