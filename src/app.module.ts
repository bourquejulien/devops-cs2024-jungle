import { Module } from "@nestjs/common";
import { StatusController } from "./Controllers/status.controller";
import { StatusService } from "./services/status.service";
import { HealthController } from "./Controllers/health.controller";
import { HttpModule } from "@nestjs/axios";
import { StateService } from "./services/state.service";
import { WeatherService } from "./services/weather.service";
import { ScheduleModule } from "@nestjs/schedule";
import { MapService } from "./services/map.service";
import { ConnectionService } from "./services/connection.service";

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    controllers: [StatusController, HealthController],
    providers: [StatusService, StateService, WeatherService, MapService, ConnectionService],
})
export class AppModule {}
