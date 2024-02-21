import { OkResult } from "./result";

export interface Weather {
    location: string;
    temperature: number;
    windSpeed: number;
    precipitation: number;
    description: string;
}

export interface WeatherResult extends OkResult {
    weather: Weather;
}
