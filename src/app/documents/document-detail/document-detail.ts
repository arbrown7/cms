import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.html',
  styleUrl: './document-detail.css',
})
export class DocumentDetail implements OnInit {
  selectedDocument: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {

  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.selectedDocument = this.documentService.getDocument(this.id);
      }
    )
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.selectedDocument.url) {
      this.nativeWindow.open(this.selectedDocument.url)
    }
  }
}
