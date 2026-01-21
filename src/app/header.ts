import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
