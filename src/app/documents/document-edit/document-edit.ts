import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: number;

  constructor(
            private documentService: DocumentService,
            private router: Router,
            private route: ActivatedRoute) {

}
  ngOnInit(): void {
    this.route.params.subscribe (
     (params: Params) => {
        this.id = params['id'];

        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(this.id.toString());

        if(!this.originalDocument) {
          return;
        }
        
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
   }); 
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(form: NgForm) {
    //Assign the values in the form fields to the corresponding properties in the newDocument
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, form.value);
    } else {
      this.documentService.addDocument(form.value);
    }
   //route back to the '/documents' URL 
   this.router.navigate(['../'], {relativeTo: this.route})
  }

}
