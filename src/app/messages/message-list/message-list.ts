import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit{
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(){
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }
}
