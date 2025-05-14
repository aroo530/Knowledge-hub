from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from llama_cpp import Llama  # Import Llama
import os

app = FastAPI()

# Load the embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Load the LLM model
MODEL_PATH = "./models/DeepSeek Coder 1.3B Instruct.gguf"  # Ensure the model file is in the same directory or provide the full path

# Check if the model file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. Please download the model first.")

# Initialize the Llama model
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=4096,  # Increase if your model supports larger context sizes
    n_threads=min(16, os.cpu_count()),  # Use available CPU cores efficiently
    n_gpu_layers=20,  # Adjust based on your GPU
)

# Request models
class TextRequest(BaseModel):
    text: str

class LLMRequest(BaseModel):
    prompt: str

@app.post("/embed")
async def generate_embedding(request: TextRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="No text provided")
    embedding = embedding_model.encode(request.text).tolist()
    return {"embedding": embedding}

@app.post("/chat")
async def chat_with_llm(request: LLMRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="No prompt provided")
    
    # Generate a response using the LLM
    output = llm(
        request.prompt,
        max_tokens=512,
        stop=[],
        echo=False
        )

    # Extract and return the generated text
    return {"response": output["choices"][0]["text"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)