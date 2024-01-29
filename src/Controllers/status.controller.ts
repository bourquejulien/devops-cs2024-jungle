import { Controller, Get } from "@nestjs/common";
import { StatusService } from "../services/status.service";

@Controller()
export class StatusController {
    constructor(private readonly appService: StatusService) {}

    @Get("/status")
    getStatus(): string {
        return JSON.stringify(this.appService.getStatus());
    }
}
