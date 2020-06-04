import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false
    @HostListener('document:click',['$event']) toggleOpen(event : Event){
        // console.log(event)
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false
        // this.isOpen = !this.isOpen
    }
    constructor(private elRef : ElementRef){}
}