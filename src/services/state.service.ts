import { Injectable } from "@nestjs/common";

@Injectable()
export class StateService {
    // eslint-disable-next-line
    private _states: Map<string, any | undefined> = new Map();

    has(entry: string) {
        if (entry in this._states) {
            return this._states[entry] !== undefined;
        }

        return false;
    }

    get<T>(entry: string): T | undefined {
        if (entry in this._states) {
            return this._states[entry] as T;
        }

        return undefined;
    }

    set(entry: string, value: unknown) {
        this._states[entry] = value;
    }
}
