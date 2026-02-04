import { Component, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '56';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    event.preventDefault();
    //Get the value stored in the subject input element
    const currentSubject = this.subjectRef.nativeElement.value;
    //Get the value stored in the msgText input element
    const currentMsgText = this.msgTextRef.nativeElement.value;
    //Create a new Message object
    //Assign a hardcoded number to the id property of the new Message object
    //Assign the value of the currentSender class variable to the sender property of the new Message object
    //Assign the values retrieved from the subject and msgText input elements to the corresponding properties of the new Message object
    const newMessage = new Message('1', currentSubject, currentMsgText, this.currentSender);
    //Call the addMessageEvent emitter’s emit() method and pass it the new Message object just created
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
