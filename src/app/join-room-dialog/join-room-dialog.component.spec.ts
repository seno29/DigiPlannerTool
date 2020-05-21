import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomDialogComponent } from './join-room-dialog.component';

describe('JoinRoomDialogComponent', () => {
  let component: JoinRoomDialogComponent;
  let fixture: ComponentFixture<JoinRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
