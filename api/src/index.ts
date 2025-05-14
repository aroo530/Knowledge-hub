import express from "express";
import dotenv from "dotenv";
import userRoutes from "./infra/http/routes/userRoutes";
import knowledgeRoutes from "./infra/http/routes/knowledgeRoutes";
import chatRouter from "./infra/http/routes/ChatRoutes";
import cors from 'cors';

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  allowedHeaders: 'Content-Type, Authorization', // Allowed headers
};

// Use CORS middleware with the specified options

dotenv.config();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/knowledge", knowledgeRoutes);
app.use("/chat", chatRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
