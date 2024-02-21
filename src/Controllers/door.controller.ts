import { Body, Controller, Param, Post } from "@nestjs/common";
import { StateService } from "../services/state.service";
import { DoorResult } from "../classes/door";
import { FailedResult } from "../classes/result";

interface Password {
    isSuccess: boolean;
    result: string;
}

@Controller()
export class DoorController {
    constructor(private readonly stateService: StateService) {}

    @Post("/unlock")
    unlock(@Body() password: Password) {
        if (password.isSuccess) {
            this.stateService.set<DoorResult>("door", { isOk: true });
            return;
        }
        this.stateService.set<FailedResult>("door", { isOk: false, description: password.result });
    }
}
