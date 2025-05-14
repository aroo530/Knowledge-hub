import axios from "axios";

const LLM_API_URL = "http://localhost:5001/chat"; // FastAPI LLM endpoint

export class LLMService {
  static async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(LLM_API_URL, { prompt });
      return response.data.response;
    } catch (error) {
      console.error("Error calling LLM API:", error);
      throw new Error("Failed to generate response from LLM");
    }
  }
}
