import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { StateService } from "./state.service";
import { Map, MapResult } from "../classes/map";
import { FailedResult } from "../classes/result";
import { AxiosError } from "axios";

@Injectable()
export class MapService {
    private readonly logger: Logger = new Logger(MapService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly stateService: StateService,
    ) {}

    @Cron("0,45 * * * * *")
    async handleCron() {
        this.logger.log("Getting map...");

        try {
            const x = 48 + Math.random();
            const y = -(71 + Math.random());
            const size = this.generateSize();

            const result = await lastValueFrom(
                this.httpService.post<Map>("http://ai/team?request=map", {
                    x,
                    y,
                    size,
                }),
            );
            if (result.status !== HttpStatus.OK) {
                this.stateService.set<FailedResult>("map", {
                    isOk: false,
                    description: `Status: ${result.status}`,
                });
                return;
            }

            const map = result.data;

            if (map.map.length !== size || map.map[0].length !== size) {
                this.stateService.set<FailedResult>("map", {
                    isOk: false,
                    description: "Wrong map size",
                });
                return;
            }

            this.stateService.set<MapResult>("map", { map: map, isOk: true });
        } catch (e) {
            const message = e instanceof AxiosError ? e.response.data : "Request failed";
            this.logger.warn(message);
            this.stateService.set<FailedResult>("map", {
                description: message,
                isOk: false,
            });
        }
    }

    private generateSize(): number {
        const size = 1 + Math.ceil(Math.random() * 11);

        if (size % 2 == 0) {
            return size + 1;
        }

        return size;
    }
}
