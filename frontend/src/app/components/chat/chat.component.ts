import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
      
  showChat: boolean = true;
  userInput: string = '';
  messages: {text: string, type: string}[] = [];
      
  // An Event to call a method in parent component
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter<string>();


  toggleChat(): void {
    this.showChat = !this.showChat;
  }

  
  sendMessage(): void {
      if (this.userInput.trim() !== '') {
      this.messages.push({ text: this.userInput, type: "sent" });
      this.eventEmitter.emit(this.userInput);
      this.userInput = '';
  }
 }

  showMessage(message: string ): void {
    this.messages.push({ text: message, type: "received" });
  }
  
}

