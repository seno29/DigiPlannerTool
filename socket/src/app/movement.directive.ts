import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Directive({
  selector: '[appMovement]'
})
export class MovementDirective {

  constructor(private elRef : ElementRef, private renderer: Renderer2) { }


  @HostListener("window:mousemove", ["$event"]) 
  moveBy(eve: MouseEvent){
    this.renderer.setStyle(this.elRef, "top", eve.clientX + 'px');
    this.renderer.setStyle(this.elRef, "left", eve.clientY + 'px');
  }
}
