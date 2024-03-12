import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { Weather, WeatherResult } from "../classes/weather";
import { lastValueFrom } from "rxjs";
import { StateService } from "./state.service";
import { FailedResult } from "../classes/result";
import { AxiosError } from "axios";

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
                this.httpService.post<Weather>("http://ai/team?request=weather", {
                    x: 73.22975,
                    y: -54.77347,
                }),
            );

            if (result.status !== HttpStatus.OK) {
                this.stateService.set<FailedResult>("weather", {
                    isOk: false,
                    description: `Error code: ${result.status}`,
                });
            }

            this.stateService.set<WeatherResult>("weather", { weather: result.data, isOk: true });
        } catch (e) {
            const warningMessage = e instanceof AxiosError ? e.response.data : "";
            const message = `Request to service failed, ${warningMessage}`;
            this.logger.warn(message);
            this.stateService.set<FailedResult>("weather", {
                description: message,
                isOk: false,
            });
        }
    }
}
