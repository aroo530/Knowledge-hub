import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/users", async (req, res) => userController.create(req, res));
router.get(
  "/users/:id",
  async (req, res) => await userController.getUser(req, res)
);

export default router;
