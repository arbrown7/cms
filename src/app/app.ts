import { Component, signal } from '@angular/core';

import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cms');

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();
  }
}
