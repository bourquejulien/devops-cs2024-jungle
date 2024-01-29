import { Injectable } from "@nestjs/common";
import { StateService } from "./state.service";
import { Weather } from "../classes/weather";

@Injectable()
export class StatusService {
    constructor(private readonly stateService: StateService) {}

    getStatus(): string[] {
        const messages: string[] = [];
        messages.push("Hello from the jungle 🌴");

        const weather = this.stateService.get<Weather>("weather");
        if (weather !== undefined) {
            messages.push(`The weather is : ${JSON.stringify(weather, null, 4)}`);
        }

        return messages;
    }
}
