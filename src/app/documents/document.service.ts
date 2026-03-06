import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://wdd-430-cms-61ab4-default-rtdb.firebaseio.com/')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });

          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId() {
    let maxId = 0;

    for (const document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
  
    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0 ) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument; 
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
