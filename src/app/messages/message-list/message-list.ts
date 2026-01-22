import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message(2, 'Subject 2', 'Message 2', 'Sender 2'),
    new Message(3, 'Subject 3', 'Message 3', 'Sender 3'),
    new Message(4, 'Subject 4', 'Message 4', 'Sender 4')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
