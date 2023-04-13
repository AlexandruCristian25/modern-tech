import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {

  }

  @HostListener('click') toggleList() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.renderer.addClass(this.elementRef.nativeElement.children[1], 'show');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.children[1], 'show');
    }
  }

}
