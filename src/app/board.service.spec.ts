import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService],
    });
    service = TestBed.inject(BoardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const roomExistData = {
    success: 'true',
    messages: ['Room Id exists and is accessible']
  }
  it('isExist() should return data', () => {
    service.isExist('diksha@gmail.com','1001').subscribe((res) => {
      expect(res).toEqual(roomExistData);
    });

    const req = httpMock.expectOne('http://localhost:4200/room/diksha@gmail.com/1001');
    expect(req.request.method).toBe('GET');
    req.flush(roomExistData);
  });

  const boardData = {
    success: 'true',
    data : {
      email: "diksha@gmail.com",
      roles : [2],
      boards : [
        {
          room_id: '1001',
          room_title: 'board 1'
        },
        {
          room_id: '1002',
          room_title: 'board 2'
        },
        {
          room_id: '1003',
          room_title: 'board 3'
        }
      ]
    }
  }

  it('viewBoard() should return data', () => {
    service.viewBoard('diksha@gmail.com').subscribe((res) => {
      expect(res).toEqual(boardData);
    });

    const req = httpMock.expectOne('http://localhost:4200/user/diksha@gmail.com');
    expect(req.request.method).toBe('GET');
    req.flush(boardData);
  });

  it('createBoard() should POST and return data', () => {
    service.createBoard('1001', 'board1', 'diksha@gmail.com').subscribe((res) => {
      expect(res).toEqual({ success: 'true', messages:'board created' });
    });

    const req = httpMock.expectOne('http://localhost:4200/board/diksha@gmail.com/1001');
    expect(req.request.method).toBe('POST');
    req.flush({ success: 'true', messages:'board created' });
  });

  it('addJoinedRoom() should POST and return data', () => {
    service.addJoinedRoom('1001','diksha@gmail.com').subscribe((res) => {
      expect(res).toEqual({ success: 'true', messages:'now joining room' });
    });

    const req = httpMock.expectOne('http://localhost:4200/room/diksha@gmail.com/1001');
    expect(req.request.method).toBe('POST');
    req.flush({ success: 'true', messages:'now joining room' });
  });

});
