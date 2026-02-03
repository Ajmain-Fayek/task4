import { NextFunction, Request, Response } from "express";
import { registerUser } from "./auth.service";
import { AppError } from "../../../lib/appError";

// Login
const login = async (req: Request, res: Response, next: NextFunction) => {
    res.send("login");
};

// Register
const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        if (!payload.name || !payload.email || !payload.password) {
            throw new AppError("name, email, password are required", 400);
        }

        const result = await registerUser(payload.name, payload.email, payload.password);
        res.status(201).json({ ...result });
    } catch (err) {
        next(err);
    }
};

// Verify user
const verify = async (req: Request, res: Response) => {
    res.send("verify");
};

export const authController = {
    login,
    verify,
    register,
};
