import { NextFunction, Request, Response } from "express";
import { UsersInfo } from "./user.service";

// Get users info
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;

        const result = await UsersInfo(Number(page) || 1, Number(limit) || 10);

        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// update users
const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("user Data");
    } catch (err) {
        next(err);
    }
};

// delete users
const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send("user Data");
    } catch (err) {
        next(err);
    }
};
export const userController = {
    getUsers,
    updateUsers,
    deleteUsers,
};
