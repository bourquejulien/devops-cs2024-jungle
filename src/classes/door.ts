import { OkResult } from "./result";

export interface Door {}

export interface DoorResult extends OkResult {
    door: Door;
}
