import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../lib/appError";
import { generateVerificationToken, sendEmail } from "./auth.utils";

//----------------------------------------
//            Login User               //
//----------------------------------------
export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new AppError("Wrong password", 401);
    }

    return {
        success: true,
        message: "logged in successful",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role,
        },
    };
};

//----------------------------------------
//            Verify User               //
//----------------------------------------
export const verifyUser = async (id: string, token: string) => {
    const isTokenMatch = await prisma.verification.findUnique({ where: { userId: id } });

    if (isTokenMatch?.token !== token) {
        throw new AppError("Invalide user id or token", 401);
    }

    await prisma.user
        .update({
            where: { id: id },
            data: {
                status: "ACTIVE",
            },
        })
        .then(async () => {
            await prisma.verification.delete({ where: { userId: id } });
        });

    return {
        success: true,
        message: "Account verified successfully",
    };
};

//----------------------------------------
//          Register User               //
//----------------------------------------
const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;

export const registerUser = async (name: string, email: string, password: string) => {
    const isExists = await prisma.user.findUnique({ where: { email } });

    if (isExists) {
        throw new AppError("This email is already linked to an account", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    // Create User
    const result = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    // Generate Token
    const token = generateVerificationToken();

    // store verification token
    await prisma.verification.upsert({
        where: {
            userId: result.id,
        },
        update: {
            token,
        },
        create: {
            userId: result.id,
            token,
        },
    });

    // Send verification email
    await sendEmail(result.id, name, email, token);

    // Return safe response
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
    };
};
