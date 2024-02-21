import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { StateService } from "./state.service";
import { Weather } from "../classes/weather";
import { Cron } from "@nestjs/schedule";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import * as fs from "fs";

@Injectable()
export class DoorService {
    private readonly logger: Logger = new Logger(DoorService.name);
    private readonly hashedPasswords: string[] = [];

    constructor(
        private readonly stateService: StateService,
        private readonly httpService: HttpService,
    ) {
        this.hashedPasswords = fs.readFileSync("passwords_hashed.txt", "utf8").split("\n");
        this.logger.log("Loaded hashed passwords");
    }

    @Cron("0,55 * * * * *")
    async handleAskPassword() {
        this.logger.log("Asking password...");

        try {
            const hash = this.hashedPasswords[Math.floor(Math.random() * this.hashedPasswords.length)]
            const result = await lastValueFrom(
                this.httpService.post<Weather>("http://ai/team?request=door", {
                    hash,
                }),
            );

            if (result.status !== HttpStatus.OK) {
                this.logger.warn("Failed to ask password");
            }
        } catch (e) {
            this.logger.warn("Failed to ask password");
        }
    }
}
