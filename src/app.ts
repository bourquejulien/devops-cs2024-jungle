import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

export class App {
    globalPrefix: string;
    constructor() {
        ConfigModule.forRoot();
        this.globalPrefix = process.env.GLOBAL_PREFIX === undefined ? "/" : (process.env.GLOBAL_PREFIX as string);
    }

    async init(): Promise<void> {
        async function bootstrap(globalPrefix: string) {
            const app = await NestFactory.create(AppModule);
            app.setGlobalPrefix(globalPrefix);
            await app.listen(3000);
        }

        return bootstrap(this.globalPrefix);
    }
}
