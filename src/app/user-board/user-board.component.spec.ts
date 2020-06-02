import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatIconTestingModule } from '@angular/material/icon/testing';


import { UserBoardComponent } from './user-board.component';
import { MockShapeService, ShapeService } from '../user-board-services/shape.service';

describe('UserBoardComponent', () => {
  let component: UserBoardComponent;
  let fixture: ComponentFixture<UserBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBoardComponent ],
      imports: [
        RouterTestingModule,
        MatIconTestingModule
      ],
      providers: [ {provide: ShapeService, useClass: MockShapeService}],
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(UserBoardComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should correctly initialize`, () => {
    const canvas = component.canvas;
    expect(canvas.boardTitle).toBeTruthy();
    expect(canvas.connect).toBeFalse();
    expect(canvas.connectButtonText).toEqual('Connect');
    expect(canvas.selectedColor).toEqual('cornsilk');
  });

  it(`connectButton should set connectMode and empty canvas.selectedElements`, () => {
    const canvas = component.canvas;
    const de = fixture.debugElement.query(By.css('.connectButton'));
    const titleEle = de.nativeElement;
    titleEle.click();
    expect(canvas.connectButtonText).toEqual('Exit Connection Mode');
    expect(canvas.connect).toBeTrue();
    expect(canvas.selectedElements).toEqual([]);
  });

  it(`clearButton should clear canvas leaving no objects on it`, () => {
    const canvas = component.canvas;
    const de = fixture.debugElement.query(By.css('.clearButton'));
    const titleEle = de.nativeElement;
    titleEle.click();
    expect(canvas._objects.length).toEqual(0);
  });

  it(`colorButton should change color`, () => {
    const canvas = component.canvas;
    expect(canvas.selectedColor).toEqual('cornsilk');
    const de = fixture.debugElement.query(By.css('.salmon'));
    const titleEle = de.nativeElement;
    titleEle.click();
    expect(canvas.selectedColor).toEqual('salmon');
  });
});
