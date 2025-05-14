import { Routes } from '@angular/router';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component';
import { ChatComponent } from './pages/chat/chat.component';
import { KnowledgeDetailComponent } from './pages/knowledge/knowledge-detail/knowledge-detail.component';

export const routes: Routes = [
  { path: 'knowledge', component: KnowledgeComponent },
  { path: 'knowledge/:id', component: KnowledgeDetailComponent },
  // { path: 'knowledge/:id', component: KnowledgeDetailComponent },
  { path: 'chat', component: ChatComponent },
];
