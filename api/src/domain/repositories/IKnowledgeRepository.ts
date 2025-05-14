import { Knowledge } from "../entities/Knowledge";

export interface IKnowledgeRepository {
  create(knowledge: Knowledge): Promise<Knowledge>;
  searchByEmbedding(embeddings: number[], title: string): Promise<any[]>;
  list(): Promise<Knowledge[]>;
}
