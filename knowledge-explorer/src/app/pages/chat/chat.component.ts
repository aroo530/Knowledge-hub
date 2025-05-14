// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { MarkdownModule } from 'ngx-markdown'; // ✅ Import ngx-markdown

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: Date;
}

@Component({
  imports: [
    MarkdownModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  title: string = 'Movies';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (!this.newMessage.trim()) return; // Prevent empty messages

    const userMessage: ChatMessage = {
      sender: 'You',
      text: this.newMessage,
      timestamp: new Date(),
    };

    this.messages.push(userMessage); // Add user's message to chat

    this.chatService.sendMessage(this.newMessage, this.title).subscribe(
      (response) => {
        if (response.success) {
          const botMessage: ChatMessage = {
            sender: 'Bot',
            text: response.response.trim(),
            timestamp: new Date(),
          };
          this.messages.push(botMessage);
        }
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );

    this.newMessage = ''; // Clear input field
  }
}
