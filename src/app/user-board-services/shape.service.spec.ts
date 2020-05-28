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

  it(`getTitleFromDatabase should have title set to 'UserUI' if database return falsy value`, () => {
    const canvas = {boardTitle: ''};
    shapeService.getTitleFromDatabase('unknown', canvas);
    expect(canvas.boardTitle).toEqual('UserUI');
  });
});
