import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../app/use-cases/Users/CreateUserUseCase";
import { UserRepository } from "../../database/UserRepository";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await createUserUseCase.execute(name, email, password);
      res.status(201).json({ user, sucess: true });
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await userRepository.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
