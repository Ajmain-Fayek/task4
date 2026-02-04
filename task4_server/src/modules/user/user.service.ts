import { prisma } from "../../../lib/prisma";

export const UsersInfo = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;

    const result = await prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
            lastLoggedinAt: "desc",
        },
        omit: { password: true, updatedAt: true },
    });

    return result;
};
