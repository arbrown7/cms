import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, "doc 1", "desc 1", "#"),
    new Document(2, "doc 2", "desc 2", "#"),
    new Document(3, "doc 3", "desc 3", "#"),
    new Document(4, "doc 4", "desc 5", "#"),
    new Document(5, "doc 5", "desc 5", "#")
  ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
