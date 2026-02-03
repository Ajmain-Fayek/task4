import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.usersData);


export const userRouter = router;
