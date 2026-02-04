import { NextFunction, Request, Response } from "express";
import { registerUser, verifyUser } from "./auth.service";
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

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// Verify user
const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, token } = req.query;

        if (!id || !token) {
            throw new AppError("id or token missing", 400);
        }

        const result = await verifyUser(id as string, token as string);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const authController = {
    login,
    verify,
    register,
};
