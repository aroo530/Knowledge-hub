import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Knowledge } from '../pages/knowledge/knowledge.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  private apiUrl = 'http://localhost:3000/knowledge'; // API Endpoint
  constructor(private http: HttpClient) {}

  private knowledgeList: Knowledge[] = [];

  getKnowledgeByTitle(title: string): Knowledge | undefined {
    return this.knowledgeList.find((k) => k.title === title);
  }

  async listKnowledge(): Promise<any> {
    this.knowledgeList = (
      await lastValueFrom(this.http.get<any>(this.apiUrl))
    ).knowledge;
    return this.knowledgeList;
  }
}
