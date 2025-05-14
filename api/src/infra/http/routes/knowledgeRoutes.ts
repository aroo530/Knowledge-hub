import express from "express";
import db from "../../database/db"; // Import DB connection
import { KnowledgeRepository } from "../../database/KnowledgeRepository";
import { CreateKnowledgeUseCase } from "../../../app/use-cases/Knowledge/CreateKnowledgeUseCase";
import { KnowledgeController } from "../controllers/KnowledgeController";
import { EmbeddingsRepository } from "../../database/EmbeddingsRepository";
import { ListKnowledgeUseCase } from "../../../app/use-cases/Knowledge/ListKnowledgeUseCase";

const router = express.Router();

// Setup dependencies
const knowledgeRepository = new KnowledgeRepository(db);
const embeddingRepository = new EmbeddingsRepository(db);
const createKnowledgeUseCase = new CreateKnowledgeUseCase(
  knowledgeRepository,
  embeddingRepository
);
const listKnowledgeUseCase = new ListKnowledgeUseCase(knowledgeRepository);
const knowledgeController = new KnowledgeController(
  listKnowledgeUseCase,
  createKnowledgeUseCase
);

// Define routes
router.post("/", (req, res) => knowledgeController.createKnowledge(req, res));
router.get("/", (req, res) => knowledgeController.listKnowledge(req, res));

export default router;
