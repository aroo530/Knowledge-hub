import { Pool } from "pg";
import { Embedding } from "../../domain/entities/Embedding";
import { IEmbeddingsRepository } from "../../domain/repositories/IEmbeddingsRepository";

export class EmbeddingsRepository implements IEmbeddingsRepository {
  constructor(private db: Pool) {}

  async storeEmbedding(embedding: Embedding): Promise<void> {
    const embeddingQuery = `
      INSERT INTO embeddings (knowledge_id, embedding)
      VALUES ($1, $2);
    `;
    await this.db.query(embeddingQuery, [
      embedding.knowledgeId,
      JSON.stringify(embedding.vector),
    ]);
  }

  async getEmbeddingByKnowledgeId(
    knowledgeId: number
  ): Promise<Embedding | null> {
    const result = await this.db.query(
      "SELECT * FROM embeddings WHERE knowledge_id = $1",
      [knowledgeId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Embedding(row.id, row.knowledge_id, JSON.parse(row.embedding));
  }
}
