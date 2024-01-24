import { Injectable } from "@nestjs/common";

@Injectable()
export class StatusService {
    getStatus(): string {
        return "Hello from the jungle 🌴";
    }
}
