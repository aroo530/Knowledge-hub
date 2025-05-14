# RAG Knowledge Assistant

### **Overview**

This project implements a **Retrieval-Augmented Generation (RAG) system** to create a self-hosted knowledge assistant. Users can upload their own documents and query them using natural language. The system is designed to run **entirely locally**, leveraging a **locally hosted LLM (DeepSeek)** and a **Postgres database** — no external APIs or cloud services required.

---

### **Features**

* **Upload Knowledge**: Users can upload custom knowledge files (text, JSON, etc.).
* **Natural Language Queries**: Users can prompt the model with questions related to their uploaded knowledge.
* **AI-Powered Responses**: Powered by a **local DeepSeek model**, the system retrieves and generates contextually relevant answers without internet dependency.
* **Fully Local Setup**: No external API keys or model hosting required.
* **Responsive UI**: Built using **Angular 19** with **Material UI** for a modern user experience.

---

### **Tech Stack**

* **Frontend**: Angular 19, Material UI
* **Backend**: Node.js, Express, TypeScript (Domain-Driven Design)
* **AI Service**: FastAPI (Python) for generating embeddings and interacting with a locally hosted **DeepSeek LLM**
* **Database**: PostgreSQL for storing knowledge files and metadata
* **Storage**: File system (future plans to support S3-compatible storage)

---

### **Local Setup and Installation**

#### 1. Clone the repository

```bash
git clone https://github.com/aroo530/Knowledge-hub.git
cd Knowledge-hub
```

#### 2. Install dependencies

* **Angular frontend**:

  ```bash
  cd angular-app
  npm install
  ```

* **Node.js backend**:

  ```bash
  cd ../backend
  npm install
  ```

* **Python FastAPI service**:

  ```bash
  pip install -r requirements.txt
  ```

> 🧠 Make sure the DeepSeek model is downloaded and placed in `pythonEmbeddingsGen/models`. and add the model name in the Python code

#### 3. Start the services

* **Frontend (Angular)**:

  ```bash
  cd angular-app
  ng serve
  ```

* **Backend (Node.js/Express)**:

  ```bash
  cd ../backend
  npm start
  ```

* **AI Service (FastAPI)**:

  ```bash
  cd pythonEmbeddingsGen
  uvicorn main:app --reload
  ```

#### 4. Access the app

* Frontend: `http://localhost:4200`
* Backend: `http://localhost:3000`
* AI Service: `http://localhost:8000`

---

### **Usage**

1. Upload your knowledge base via the "Upload Knowledge" interface.
2. Ask questions in natural language through the chat interface.
3. The system uses local embeddings and a local LLM to retrieve relevant content and respond intelligently.

---

### **Why Local?**

* **Privacy-first**: No data is sent to third-party services.
* **Offline capability**: Works in completely air-gapped environments.
* **Cost-effective**: No need for API keys, model hosting, or cloud compute.

---

### **Future Improvements**

* **Cloud file storage support** (e.g. S3, MinIO)
* **Multi-user management and auth**
* **Improved chunking and context retrieval**
* **Model upgrade to support longer contexts and multi-modal input**

---
