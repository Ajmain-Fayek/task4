import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../lib/appError";
import { generateVerificationToken, sendEmail } from "./auth.utils";

const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;

// Register
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
    await sendEmail(name, email, token);

    // Return safe response
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
    };
};
