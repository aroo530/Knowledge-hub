import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../../services/knowledge.service';
import { Knowledge } from './knowledge.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit {
  knowledgeList: Knowledge[] = [];

  constructor(
    private knowledgeService: KnowledgeService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    this.knowledgeList = await this.knowledgeService.listKnowledge();
    return;
  }

  navigateToDetail(knowledge: any) {
    this.router.navigate(['/knowledge', knowledge.title]);
  }
}
