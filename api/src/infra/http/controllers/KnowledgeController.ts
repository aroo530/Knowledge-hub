import { Request, Response } from "express";
import { ListKnowledgeUseCase } from "../../../app/use-cases/Knowledge/ListKnowledgeUseCase";
import { CreateKnowledgeUseCase } from "../../../app/use-cases/Knowledge/CreateKnowledgeUseCase";

export class KnowledgeController {
  constructor(
    private listKnowledgeUseCase: ListKnowledgeUseCase,
    private createKnowledgeUseCase: CreateKnowledgeUseCase
  ) {}

  async createKnowledge(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const knowledge = await this.createKnowledgeUseCase.execute(
        title,
        content
      );
      res.status(201).json({ success: true, knowledge });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  }

  async listKnowledge(req: Request, res: Response): Promise<void> {
    try {
      const knowledge = await this.listKnowledgeUseCase.execute();
      res.status(201).json({ success: true, knowledge });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }
  }
}
