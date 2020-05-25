import { Component, OnInit, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';

import { ShapeService } from '../user-board-services/shape.service';
import { GroupService } from '../user-board-services/group.service';


@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  colors: Array<string>;
  background: string;
  selectedColor: string;
  canvas: fabric.Canvas;

  constructor(private shapeService: ShapeService, private renderer: Renderer2, private groupService: GroupService) {
    this.selectedColor = 'cornsilk';
    this.background = 'white';
    this.colors = ['cornsilk', 'CornflowerBlue', 'aquamarine', 'thistle', 'salmon'];
  }

  ngOnInit(): void {
    var img =new Image();
    
    this.canvas = this.shapeService.initCanvas(this.renderer);
    img.onload = ()=> {
      var f_img = new fabric.Image(img);
      this.canvas.setBackgroundImage(f_img);
      this.canvas.renderAll();
  };
    // Define the Data URI
  var myDataURL = "data:image/png;base64,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B10759py87yby9RTpkaJJAcBAgQIECBAgAABAgQIEOipwIQPDT/e7p1D75RX979adh7e2dML9+PwxTMXl5VzV5bLZ13ej4/zGQQIECBAgAABAgQIECBAIIxAmKHhR5EtX24pr3/xespfp+j8msT1Z19frj7r6jAFC0KAAAECBAgQIECAAAECBPopEG5o+PHymw9sLm8ceKPs+25fPz0afda8afPKdXOuKyvmrGj0vIcIECBAgAABAgQIECBAgMBkEQg7NPwI/NbXb5U3//Jm2fHtjnDmS09bWq75+TXlyjOuDJdNIAIECBAgQIAAAQIECBAgMBEC4YeGH1H2HN1Ttn69tbz99dsT+msVnV+PuOKMK8pVZ1xVFkxfMBGd+UwCBAgQIECAAAECBAgQIBBWIM3Q8I+Cuw/vLtu/3f7Dv3LYdXhXz3EXzVxUOv96Ydlpy8rCmQt7/nk+gAABAgQIECBAgAABAgQIZBVIOTT8I/aRsSNl5193lo+OfFQ+PfJp2fvd3nH9i4fOv1iYP21+OX/G+eWiGReVxT9bXGYMzMjar9wECBAgQIAAAQIECBAgQKCvAumHhn+lNXZirHxx7Ivy1fGvysHjB8vhscPl6NjRcvzE8fL9ie/LKVNOKVOnTC3TB6aXmQMzy+yps8uZU88sZ596dhmYMtDXAnwYAQIECBAgQIAAAQIECBCYTAKTcmiYTAW5CwECBAgQIECAAAECBAgQyCRgaMjUlqwECBAgQIAAAQIECBAgQCC4gKEheEHiESBAgAABAgQIECBAgACBTAKGhkxtyUqAAAECBAgQIECAAAECBIILGBqCFyQeAQIECBAgQIAAAQIECBDIJGBoyNSWrAQIECBAgAABAgQIECBAILiAoSF4QeIRIECAAAECBAgQIECAAIFMAoaGTG3JSoAAAQIECBAgQIAAAQIEggsYGoIXJB4BAgQIECBAgAABAgQIEMgkYGjI1JasBAgQIECAAAECBAgQIEAguIChIXhB4hEgQIAAAQIECBAgQIAAgUwChoZMbclKgAABAgQIECBAgAABAgSCCxgaghckHgECBAgQIECAAAECBAgQyCRgaMjUlqwECBAgQIAAAQIECBAgQCC4gKEheEHiESBAgAABAgQIECBAgACBTAKGhkxtyUqAAAECBAgQIECAAAECBIILGBqCFyQeAQIECBAgQIAAAQIECBDIJGBoyNSWrAQIECBAgAABAgQIECBAILiAoSF4QeIRIECAAAECBAgQIECAAIFMAoaGTG3JSoAAAQIECBAgQIAAAQIEggsYGoIXJB4BAgQIECBAgAABAgQIEMgkYGjI1JasBAgQIECAAAECBAgQIEAguIChIXhB4hEgQIAAAQIECBAgQIAAgUwChoZMbclKgAABAgQIECBAgAABAgSCCxgaghckHgECBAgQIECAAAECBAgQyCRgaMjUlqwECBAgQIAAAQIECBAgQCC4gKEheEHiESBAgAABAgQIECBAgACBTAKGhkxtyUqAAAECBAgQIECAAAECBIILGBqCFyQeAQIECBAgQIAAAQIECBDIJGBoyNSWrAQIECBAgAABAgQIECBAILiAoSF4QeIRIECAAAECBAgQIECAAIFMAoaGTG3JSoAAAQIECBAgQIAAAQIEggsYGoIXJB4BAgQIECBAgAABAgQIEMgkYGjI1JasBAgQIECAAAECBAgQIEAguIChIXhB4hEgQIAAAQIECBAgQIAAgUwChoZMbclKgAABAgQIECBAgAABAgSCCxgaghckHgECBAgQIECAAAECBAgQyCRgaMjUlqwECBAgQIAAAQIECBAgQCC4gKEheEHiESBAgAABAgQIECBAgACBTAKGhkxtyUqAAAECBAgQIECAAAECBIILGBqCFyQeAQIECBAgQIAAAQIECBDIJGBoyNSWrAQIECBAgAABAgQIECBAILiAoSF4QeIRIECAAAECBAgQIECAAIFMAoaGTG3JSoAAAQIECBAgQIAAAQIEggsYGoIXJB4BAgQIECBAgAABAgQIEMgkYGjI1JasBAgQIECAAAECBAgQIEAguIChIXhB4hEgQIAAAQIECBAgQIAAgUwChoZMbclKgAABAgQIECBAgAABAgSCCxgaghckHgECBAgQIECAAAECBAgQyCRgaMjUlqwECBAgQIAAAQIECBAgQCC4gKEheEHiESBAgAABAgQIECBAgACBTAKGhkxtyUqAAAECBAgQIECAAAECBIILGBqCFyQegcgCs/97Y+R4rcx28FfDrby3SxMgQIAAAQIECMQRMDTE6UISAukEOkPD6b8fSZd7sgb+5r+GiqFhsrbrXgQIECBAgACBPAKGhjxdSUognIChIVYlhoZYfUhDgAABAgQIEGirgKGhrc27N4EK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AQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBUwNGRtTm4CBAgQIECAAAECBAgQIBBQwNAQsBSRCBAgQIAAAQIECBAgQIBAVgFDQ9bm5CZAgAABAgQIECBAgAABAgEFDA0BSxGJAAECBAgQIECAAAECBAhkFTA0ZG1ObgIECBAgQIAAAQIECBAgEFDA0BCwFJEIECBAgAABAgQIECBAgEBWAUND1ubkJkCAAAECBAgQIECAAAECAQUMDQFLEYkAAQIECBAgQIAAAQIECGQVMDRkbU5uAgQIECBAgAABAgQIECAQUMDQELAUkQgQIECAAAECBAgQIECAQFYBQ0PW5uQmQIAAAQIECBAgQIAAAQIBBQwNAUsRiQABAgQIECBAgAABAgQIZBX4H+mBKYGLeWcwAAAAAElFTkSuQmCC";
    // Set the src of the image with the base64 string
  img.src = myDataURL;
  }

  addEllipse(){ this.shapeService.addEllipse(this.canvas, this.renderer); }

  addRectangle() { this.shapeService.addRectangle(this.canvas, this.renderer); }

  addImage(){ this.shapeService.addImage(this.canvas, '', this.renderer); }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.ngOnInit();
    }
  }

  connect(){
    if (this.canvas.connect){
      this.canvas.connect = false;
      this.canvas.connectButtonText = 'Connect';
    }
    else{
      while (this.canvas.selectedElements.length > 0 ){
        this.canvas.selectedElements.pop();
      }
      this.canvas.connect = true;
      this.canvas.connectButtonText = 'Exit Connection Mode';
    }
  }

  changeColor(color: string){
    this.canvas.selectedColor = color;
    this.groupService.changeColor(this.canvas, color, this.renderer);
  }
}
