import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { Weather, WeatherResult } from "../classes/weather";
import { lastValueFrom } from "rxjs";
import { StateService } from "./state.service";
import { FailedResult } from "../classes/result";

@Injectable()
export class WeatherService {
    private readonly logger: Logger = new Logger(WeatherService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly stateService: StateService,
    ) {}

    @Cron("0,30 * * * * *")
    async handleCron() {
        this.logger.log("Getting weather data...");

        try {
            const result = await lastValueFrom(
                this.httpService.get<Weather>("http://ai/team?request=weather&address=none", {}),
            );

            if (result.status !== HttpStatus.OK) {
                this.stateService.set<FailedResult>("weather", {
                    isOk: false,
                    description: `Error code: ${result.status}`,
                });
            }

            this.stateService.set<WeatherResult>("weather", { weather: result.data, isOk: true });
        } catch (e) {
            this.logger.warn("Failed to parse weather data");
            this.stateService.set<FailedResult>("weather", {
                description: "Failed to parse weather data",
                isOk: false,
            });
        }
    }
}
