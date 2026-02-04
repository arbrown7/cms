import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';


@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents {
  selectedDocument: Document;

    constructor(private documentService: DocumentService) {}
  
    ngOnInit() {
      this.documentService.documentSelectedEvent
      .subscribe(
        (document: Document) => {
          this.selectedDocument = document;
        }
      );
    }
}
