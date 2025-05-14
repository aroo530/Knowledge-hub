import axios from "axios";

export class EmbeddingService {
  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await axios.post("http://127.0.0.1:5001/embed", {
        text,
      });
      return response.data.embedding;
    } catch (error) {
      console.error("Error fetching embeddings:", error);
      return [];
    }
  }
}
