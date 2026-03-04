import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false,
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    //Create a new array to contain the filtered list of contacts
    let filteredContacts: Contact[] = [];

    if (term && term.length > 0) {
      filteredContacts = contacts.filter(
         (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    //  If the new filtered array has no contacts in it THEN
    if (filteredContacts.length < 1) {
      //RETURN the original contacts list
      return contacts;
    }
    
    //  RETURN the new filtered array of contacts
    return filteredContacts;
  }

}
