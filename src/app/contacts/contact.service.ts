import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts : Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  //AI generated code
  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
  //end of AI generated code

  deleteContact(contact: Contact) { 
    if (!contact) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getMaxId() {
    let maxId = 0;

    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

    addContact(newContact: Contact) {
      if (!newContact) {
        return;
      }
    
      this.maxContactId++;
  
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  
    updateDocument(originalContact: Contact, newContact: Contact) {
      if (!originalContact || !newContact) {
        return;
      }
  
      let pos = this.contacts.indexOf(originalContact);
      if (pos < 0 ) {
        return;
      }
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact; 
      this.contactListChangedEvent.next(this.contacts.slice());
    }
}
