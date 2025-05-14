import { Embedding } from "../entities/Embedding";

export interface IEmbeddingsRepository {
  storeEmbedding(embedding: Embedding): Promise<void>;
  getEmbeddingByKnowledgeId(knowledgeId: number): Promise<Embedding | null>;
}
