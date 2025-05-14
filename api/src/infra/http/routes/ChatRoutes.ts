import express from "express";
import { ChatController } from "../controllers/ChatController";
import { RespondToUser } from "../../../app/use-cases/Chat/respondeToUser"; // Import the use case
import { KnowledgeRepository } from "../../database/KnowledgeRepository";
import db from "../../database/db";

// Create an instance of the use case
const knowledgeRepository = new KnowledgeRepository(db);
const respondToUser = new RespondToUser(knowledgeRepository);

// Create an instance of the controller
const chatController = new ChatController(respondToUser);

// Create the router
const chatRouter = express.Router();

// Define the route
chatRouter.post("/", (req, res) =>
  chatController.generateResponse(req, res)
);

// Export the router
export default chatRouter;
