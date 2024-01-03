import * as logger from "winston";
import winston from "winston";

export const LOGGING_DEFAULT = {
    level: "info",
    transports: [
        new logger.transports.Console({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.splat(),
                winston.format.timestamp({ format: "HH:mm:ss" }),
                winston.format.printf(
                    ({ level, message, timestamp, stack }) =>
                        `${timestamp} - ${level} - ${message}` + (stack !== undefined ? ` - ${stack}` : ""),
                ),
            ),
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
};
