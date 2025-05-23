import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chat'; // API Endpoint

  constructor(private http: HttpClient) {}

  sendMessage(message: string, title: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt: message, title });
  }
}
