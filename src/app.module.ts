import { Module } from "@nestjs/common";
import { StatusController } from "./Controllers/statusController";
import { StatusService } from "./services/status-servie.service";
import { HealthController } from "./Controllers/health.controller";

@Module({
    imports: [],
    controllers: [StatusController, HealthController],
    providers: [StatusService],
})
export class AppModule {
}
