import { IKnowledgeRepository } from "../../../domain/repositories/IKnowledgeRepository";

export class ListKnowledgeUseCase {
  constructor(private knowledgeRepository: IKnowledgeRepository) {}

  async execute() {
    try {
      const knowledge = await this.knowledgeRepository.list();
      return knowledge;
    } catch (error) {
      console.error("Error listing knowledge:", error);
      throw new Error("Failed to create knowledge");
    }
  }
}
