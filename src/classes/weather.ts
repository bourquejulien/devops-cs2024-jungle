import { OkResult } from "./result";

export interface Weather {
    temperature: number;
    windSpeed: number;
    precipitation: number;
}

export interface WeatherResult extends OkResult {
    weather: Weather;
}
