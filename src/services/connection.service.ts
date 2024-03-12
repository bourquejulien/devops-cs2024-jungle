import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { StateService } from "./state.service";
import { ConnectionResult } from "../classes/connection-result";
import { FailedResult } from "../classes/result";
import { AxiosError } from "axios";

@Injectable()
export class ConnectionService {
    private readonly logger: Logger = new Logger(ConnectionService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly stateService: StateService,
    ) {}

    @Cron("0,30 * * * * *")
    async handleCron() {
        this.logger.log("Getting connection status...");

        try {
            const result = await lastValueFrom(this.httpService.post("http://ai/team?request=status", {}));
            if (result.status === HttpStatus.OK) {
                this.stateService.set<ConnectionResult>("connection", { isOk: true });
                return;
            }

            this.stateService.set<FailedResult>("connection", {
                isOk: false,
                description: `Status: ${result.data}`,
            });
        } catch (e) {
            const warningMessage = e instanceof AxiosError ? e.response.data : "";
            const message = `Request to service failed, ${warningMessage}`;
            this.logger.warn(message);
            this.stateService.set<FailedResult>("connection", {
                description: message,
                isOk: false,
            });
        }
    }
}
