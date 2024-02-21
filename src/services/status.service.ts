import { Injectable } from "@nestjs/common";
import { StateService } from "./state.service";
import { WeatherResult } from "../classes/weather";
import { Result } from "../classes/result";
import { MapResult } from "../classes/map";
import { ConnectionResult } from "../classes/connection-result";

interface Step {
    name: string;
    status: string;
}

@Injectable()
export class StatusService {
    constructor(private readonly stateService: StateService) {}

    getStatus(): Step[] {
        const messages: Step[] = [];
        messages.push({ name: "Access", status: "Hello from the jungle 🌴" });

        const connection = this.stateService.get<ConnectionResult>("connection");
        if (connection !== undefined) {
            messages.push({ name: "Connection (from jungle to team)", status: this.getDescription(connection) });
        }

        const weather = this.stateService.get<WeatherResult>("weather");
        if (weather !== undefined) {
            messages.push({ name: "Weather", status: this.getDescription(weather) });
        }

        const map = this.stateService.get<MapResult>("map");
        if (weather !== undefined) {
            messages.push({ name: "Map", status: this.getDescription(map) });
        }

        return messages;
    }

    private getDescription(result: Result): string {
        if (result.isOk) {
            return "✅ OK";
        }

        return `❌ Failed with ${result.description}`;
    }
}
