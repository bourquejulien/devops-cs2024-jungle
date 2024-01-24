import { Injectable } from "@nestjs/common";

@Injectable()
export class StateService {
    private _states: Map<string, boolean> = new Map();

    has(entry: string) {
        if (entry in this._states) {
            return this._states[entry];
        }

        return false;
    }

    set(entry: string, value: boolean) {
        this._states[entry] = value;
    }
}
