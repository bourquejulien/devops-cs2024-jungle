import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { Weather } from "../classes/weather";
import { lastValueFrom } from "rxjs";
import { StateService } from "./state.service";

@Injectable()
export class WeatherService {
    private readonly logger = new Logger(WeatherService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly stateService: StateService,
    ) {}

    @Cron("0,30 * * * * *")
    async handleCron() {
        let weather: Weather | undefined = undefined;

        this.logger.log("Getting weather data...");

        try {
            const result = await lastValueFrom(this.httpService.get<Weather>("http://ai/weather"));
            weather = result.data;
        } catch (e) {
            this.logger.warn("Failed to parse weather data");
            this.stateService.set("weather", false);
        }

        if (weather === undefined) {
            return;
        }

        this.stateService.set("weather", true);
    }
}
