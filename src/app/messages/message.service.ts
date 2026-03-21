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
    this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.maxMessageId = this.getMaxId();
          this.sortAndSend();
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

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    // make sure id of the new Message is empty
    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, createdMessage: Message }>('http://localhost:3000/messages',
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.createdMessage);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
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
        'http://localhost:3000/messages/', messagesString, { headers: headers })
      .subscribe(response => {
        this.messageChangedEvent.next(this.messages.slice());
    });
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
}
