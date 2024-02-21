import { OkResult } from "./result";

export interface Map {
    map: number[][];
}

export interface MapResult extends OkResult {
    map: Map;
}
