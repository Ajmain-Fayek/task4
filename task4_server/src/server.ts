import { prisma } from "../lib/prisma";
import { logger } from "../lib/logger";
import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        logger.success("database connected successfully");

        app.listen(PORT, () => {
            logger.info(`app is listening to port: ${PORT}`);
        });
    } catch (err) {
        logger.error(
            `failed to connet to database: ${err instanceof Error ? err.message : "unknown error"}`,
        );

        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
