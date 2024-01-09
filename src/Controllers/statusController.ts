import { Controller, Get } from "@nestjs/common";
import { StatusService } from "../services/status-servie.service";

@Controller()
export class StatusController {
    constructor(private readonly appService: StatusService) {
    }

    @Get("/status")
    getStatus(): string {
        return this.appService.getStatus();
    }
}
