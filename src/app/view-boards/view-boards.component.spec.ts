import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBoardsComponent } from './view-boards.component';

describe('ViewBoardsComponent', () => {
  let component: ViewBoardsComponent;
  let fixture: ComponentFixture<ViewBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
