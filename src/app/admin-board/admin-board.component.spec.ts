import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminBoardComponent } from './admin-board.component';
import { MatModule } from '../material.module';

describe('AdminBoardComponent', () => {
  let component: AdminBoardComponent;
  let fixture: ComponentFixture<AdminBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [RouterTestingModule,HttpClientTestingModule,MatModule],
      declarations: [ AdminBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title adminboard `, (() => {
    fixture = TestBed.createComponent(AdminBoardComponent);
    component = fixture.componentInstance;
    expect(component.title).toEqual('adminboard');
  }));

  it(`initialization check `, (() => {
    expect(component.colors).toBeTruthy;
    expect(component.canvas).toBeTruthy;
    expect(component.selectedColor).toBeTruthy;
  }));

  it(`should colors greater than 0`, () => {
    expect(component.colors.length).toBeGreaterThan(0);
  });

  it(`adding shape to canvas`, () => {
    expect(component.canvas.getObjects()).toBeNull;
    const temp = fixture.debugElement.query(By.css('.addShape'));
    const element = temp.nativeElement;
    element.click();
    expect(component.canvas.getObjects()).length>0;
  });

  it(`changing color by clicking on color palette`, () => {
    expect(component.selectedColor).toEqual('aqua');
    const temp = fixture.debugElement.query(By.css('.lime'));
    const element = temp.nativeElement;
    element.click();
    expect(component.selectedColor).toEqual('lime');
  });

  it(`reset and clear whole canvas`, () => {
    expect(component.canvas).toBeTruthy;
    const temp = fixture.debugElement.query(By.css('.clearButton'));
    const reset = temp.nativeElement;
    reset.click();
    expect(component.canvas.getObjects()).toBeNull;
  });

  it(`converting the canvas to base64 format`, () => {
    expect(component.convertedCanvas).toEqual(undefined);
    const temp = fixture.debugElement.query(By.css('.convertCanvas'));
    const element = temp.nativeElement;
    element.click();
    expect(component.convertedCanvas).toBeInstanceOf(String);
  });

});
