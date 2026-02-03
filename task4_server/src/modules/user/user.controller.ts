import { Request, Response } from "express";

const usersData = async (req: Request, res: Response) => {
    res.send("user Data");
};

export const userController = {
    usersData,
};
