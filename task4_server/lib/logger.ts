const LogColors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    debug: "\x1b[35m",
    success: "\x1b[32m",
    reset: "\x1b[0m",
};

export const logger = {
    info: (message: string) => {
        console.log(
            `${LogColors.info}[info]${LogColors.reset} [${new Date().toISOString()}] ${message}`,
        );
    },
    error: (message: string) => {
        console.error(
            `${LogColors.error}[error]${LogColors.reset} [${new Date().toISOString()}] ${message}`,
        );
    },
    warn: (message: string) => {
        console.warn(
            `${LogColors.warn}[warn]${LogColors.reset} [${new Date().toISOString()}] ${message}`,
        );
    },
    debug: (message: string) => {
        console.debug(
            `${LogColors.debug}[debug]${LogColors.reset} [${new Date().toISOString()}] ${message}`,
        );
    },
    success: (message: string) => {
        console.log(
            `${LogColors.success}[succes]${LogColors.reset} [${new Date().toISOString()}] ${message}`,
        );
    },
};
