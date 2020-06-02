import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const responseData = {
      success : 'true',
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
   
    it('getUserType() should return data', () => {
      service.getUserType('diksha@gmail.com').subscribe((res) => {
        expect(res).toEqual(responseData);
      });
  
      const req = httpMock.expectOne('http://localhost:4200/user/diksha@gmail.com');
      expect(req.request.method).toBe('GET');
      req.flush(responseData);
    }); 
});
