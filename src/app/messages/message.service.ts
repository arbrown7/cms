import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages : Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): void {
        this.http.get<Message[]>('https://wdd-430-cms-61ab4-default-rtdb.firebaseio.com/messages.json')
          .subscribe(
            (messages: Message[]) => {
              this.messages = messages;
              this.maxMessageId = this.getMaxId();
    
              this.messages.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else if (a.id > b.id) {
                  return 1;
                } else {
                  return 0;
                }
              });
    
              this.messageChangedEvent.next(this.messages.slice());
            },
            (error: any) => {
              console.log(error);
            }
          );
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId() {
    let maxId = 0;

    for (const message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .put(
        'https://wdd-430-cms-61ab4-default-rtdb.firebaseio.com/messages.json', messagesString, { headers: headers })
      .subscribe(response => {
        this.messageChangedEvent.next(this.messages.slice());
    });
  }
}
