import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '../../../services/knowledge.service';
import { Knowledge } from '../knowledge.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-knowledge-detail',
  templateUrl: './knowledge-detail.component.html',
  styleUrls: ['./knowledge-detail.component.css'],
})
export class KnowledgeDetailComponent {
  knowledge: Knowledge | undefined;
  isEditing: boolean = false;
  editedKnowledge: Knowledge = { id: 0, title: '', content: '' };

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeService,
    private router: Router
  ) {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.knowledge = this.knowledgeService.getKnowledgeByTitle(id);
    if (this.knowledge) {
      this.editedKnowledge = { ...this.knowledge };
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.knowledge) {
      this.editedKnowledge = { ...this.knowledge }; // Reset edits if cancelled
    }
  }

  saveEdit() {
    // if (this.knowledge) {
    //   this.knowledgeService.updateKnowledge(this.editedKnowledge);
    //   this.knowledge = { ...this.editedKnowledge };
    //   this.isEditing = false;
    // }
  }

  deleteKnowledge() {
    // if (this.knowledge) {
    //   this.knowledgeService.deleteKnowledge(this.knowledge.id);
    //   this.router.navigate(['/knowledge']);
    // }
  }
}
