import { EmbeddingService } from "../../services/embeddingService";
import { LLMService } from "../../services/llmService";
import { IKnowledgeRepository } from "../../../domain/repositories/IKnowledgeRepository";

export class RespondToUser {
  constructor(private knowledgeRepository: IKnowledgeRepository) {}

  async handleUserPrompt(prompt: string, title: string): Promise<string> {
    try {
      // Step 2: Generate embeddings for user prompt
      const embedding = await EmbeddingService.generateEmbedding(prompt);

      // Step 3: Search the knowledge base using vector search
      const relevantDocs = await this.knowledgeRepository.searchByEmbedding(
        embedding,
        title
      );
      // Step 4: Format context for LLM
      const context = relevantDocs.map((doc) => doc.content).join("\n");

      const fullPrompt = `
        You are a helpful and factual AI assistant. 
        Your task is to answer the user's question **only** using the information provided in the context below.
        ### Context:${context}
        ### Question:
        ${prompt}
        ### Answer:
      `.trim();
      const response = await LLMService.generateResponse(fullPrompt);
      return response;
    } catch (error) {
      console.error("Error handling user prompt:", error);
      throw new Error("Failed to process chat request");
    }
  }
}
