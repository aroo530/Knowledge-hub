import { TextUtils } from "../../../shared/utils/TextUtils";
import { Knowledge } from "../../../domain/entities/Knowledge";
import { Embedding } from "../../../domain/entities/Embedding";
import { IKnowledgeRepository } from "../../../domain/repositories/IKnowledgeRepository";
import { IEmbeddingsRepository } from "../../../domain/repositories/IEmbeddingsRepository";
import { EmbeddingService } from "../../services/embeddingService";

export class CreateKnowledgeUseCase {
  constructor(
    private knowledgeRepository: IKnowledgeRepository,
    private embeddingsRepository: IEmbeddingsRepository
  ) {}

  async execute(title: string, content: string): Promise<Knowledge[]> {
    try {
      // Use the utility function to split content
      const chunks = TextUtils.splitText(content, 1000);
      const knowledgeChunks: Knowledge[] = [];

      for (const chunk of chunks) {
        const knowledge = new Knowledge(null, title, chunk);
        const { id } = await this.knowledgeRepository.create(knowledge);
        if (!id) throw new Error();

        knowledge.id = id;
        knowledgeChunks.push(knowledge);

        const embeddingVector = await EmbeddingService.generateEmbedding(chunk);

        const embedding = new Embedding(null, id, embeddingVector);
        await this.embeddingsRepository.storeEmbedding(embedding);
      }

      return knowledgeChunks;
    } catch (error) {
      console.error("Error creating knowledge:", error);
      throw new Error("Failed to create knowledge");
    }
  }
}
