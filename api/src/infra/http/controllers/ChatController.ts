import { Request, Response } from "express";
import { RespondToUser } from "../../../app/use-cases/Chat/respondeToUser";

export class ChatController {
  constructor(private RespondToUser: RespondToUser) {}

  async generateResponse(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, title } = req.body;

      const response = await this.RespondToUser.handleUserPrompt(prompt, title);

      res.status(201).json({ success: true, response });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  }
}
