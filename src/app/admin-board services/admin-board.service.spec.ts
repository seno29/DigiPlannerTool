import { TestBed , getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminBoardService } from './admin-board.service';

describe('AdminBoardService', () => {
  let service: AdminBoardService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminBoardService,
      ],
    });
    injector = getTestBed();
    service = injector.get(AdminBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should PUT and return data', () => {
    service.sendingData('base64string', '1234').subscribe((res) => {
      expect(res).toEqual('OK');
    });
  });
});
