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
    new Document(1, "A Random Document Title", "A random document description", "https://example.com"),
    new Document(2, "How to Create a Custom Directive", "Angular instruction manual", "https://example.com"),
    new Document(3, "Why are Whales Blue?", "A deep dive into the world of whales and their blue hue", "https://example.com"),
    new Document(4, "Dumpster Rental Form", "Contract for Dumpster Rentals for Draper City", "https://example.com"),
    new Document(5, "Class Notes", "My notes for this class", "https://example.com")
  ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
