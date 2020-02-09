import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = (evt) => {
      this.el.nativeElement.onkeypress = (evt) => {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
      };
    };
  }
}
