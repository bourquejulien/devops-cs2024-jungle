import { App } from "./app";
import dotenv from "dotenv";
import * as logger from "winston";
import { LOGGING_DEFAULT } from "./classes/logging";

dotenv.config();
logger.configure(LOGGING_DEFAULT);

process.on("unhandledRejection", (reason: Error) => {
    throw reason;
});

const app = new App();

app.init();
