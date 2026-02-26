import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit implements OnInit {
  originalDocuent: Document;
  document: Document;
  editMode: boolean = false;
  ngOnInit(): void {
    
  }

  onCancel() {}

  onSubmit(f) {}

}
