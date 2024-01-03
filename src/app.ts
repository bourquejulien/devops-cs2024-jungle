import logger from "winston";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export class App {

    constructor() {
    }

    async init(): Promise<void> {
        async function bootstrap() {
            const app = await NestFactory.create(AppModule);
            await app.listen(3000);
        }

        bootstrap();
    }
}
