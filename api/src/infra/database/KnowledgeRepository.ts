import { Pool } from "pg";
import { IKnowledgeRepository } from "../../domain/repositories/IKnowledgeRepository";
import { Knowledge } from "../../domain/entities/Knowledge";

export class KnowledgeRepository implements IKnowledgeRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async create(knowledge: Knowledge): Promise<Knowledge> {
    const query =
      "INSERT INTO knowledge (title, content) VALUES ($1, $2) RETURNING *";
    const values = [knowledge.title, knowledge.content];
    const result = await this.db.query(query, values);

    return new Knowledge(
      result.rows[0].id,
      result.rows[0].title,
      result.rows[0].content,
      result.rows[0].created_at
    );
  }

  async searchByEmbedding(embedding: number[], title: string): Promise<any[]> {
    // Convert embedding array to a string that matches pgvector's format
    const embeddingString = `[${embedding.join(",")}]`;
    // Search the embeddings table using pgvector's similarity function
    const query = `
      SELECT knowledge.id, knowledge.content, embeddings.embedding
      FROM knowledge
      JOIN embeddings ON knowledge.id = embeddings.knowledge_id
      WHERE knowledge.title = ($2)
      ORDER BY embeddings.embedding <=> ($1) -- Cosine similarity
      LIMIT 3;
    `;

    try {
      const result = await this.db.query(query, [embeddingString, title]);

      return result.rows;
    } catch (error) {
      console.error("Error during vector search:", error);
      throw new Error("Error searching the knowledge base.");
    }
  }
  async list(): Promise<Knowledge[]> {
    const query = `
    SELECT 
      title,
      STRING_AGG(content, ' ') AS content
    FROM knowledge
    GROUP BY title;
    `;

    const result = await this.db.query(query);

    return result.rows;
  }
}
