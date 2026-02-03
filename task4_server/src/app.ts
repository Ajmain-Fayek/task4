import express from "express";
import { authRouter } from "./modules/auth/auth.router";
import { userRouter } from "./modules/user/user.router";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/appError";
import { logger } from "../lib/logger";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message ? err.message : "Something unexpected happend",
        });
    }

    logger.error(err);
    res.status(500).json({
        success: false,
        message: "Internal server Error",
    });
});

app.get("/", (req, res) => {
    res.send("Health ok");
});

export default app;
