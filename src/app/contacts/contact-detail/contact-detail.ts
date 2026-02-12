import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css',
})
export class ContactDetail {
  @Input() selectedContact: Contact;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router: Router) {

  }
  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.selectedContact = this.contactService.getContact(params['id']);
    });
  }

}
