import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]',
  standalone: false,
})
export class Dropdown {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
