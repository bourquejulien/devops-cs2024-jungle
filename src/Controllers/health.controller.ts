import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
    constructor() {}

    @Get("/healthz")
    getStatus(): string {
        return "Healthy";
    }
}
