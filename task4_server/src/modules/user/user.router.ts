import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);
router.put("/", userController.updateUsers);
router.delete("/", userController.deleteUsers);

export const userRouter = router;
