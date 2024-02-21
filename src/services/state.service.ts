import { Injectable } from "@nestjs/common";
import { Result } from "../classes/result";

@Injectable()
export class StateService {
    private _states: Map<string, Result | undefined> = new Map();

    has(entry: string) {
        if (entry in this._states) {
            return this._states[entry] !== undefined;
        }

        return false;
    }

    get<T extends Result>(entry: string): T | undefined {
        if (entry in this._states) {
            return this._states[entry] as T;
        }

        return undefined;
    }

    set<T extends Result>(entry: string, value: T) {
        this._states[entry] = value;
    }
}
