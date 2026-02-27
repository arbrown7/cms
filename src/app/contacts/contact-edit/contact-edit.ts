import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        //id = value of id parameter in params list
        this.id = params['id'];
        //if id parameter is undefined or null
        if (!this.id) {
          this.editMode = false
          return;
        }
        this.originalContact = this.contactService.getContact(this.id)

        //if originalContact is undefined or null
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        //if the contact has a group then
        if (this.originalContact.group) {
          //groupContacts = clone the contact’s group
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      })
  }
  onSubmit(form: NgForm) {
    //Assign the values in the form fields to the corresponding properties in the newContact
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, form.value);
    } else {
      this.contactService.addContact(form.value);
    }
    //route back to the '/contacts' URL 
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
