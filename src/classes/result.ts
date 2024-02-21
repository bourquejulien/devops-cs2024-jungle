export interface Result {
    isOk: boolean;
    description?: string | undefined;
}

export interface OkResult extends Result {
    isOk: true;
    description?: undefined;
}

export interface FailedResult extends Result {
    isOk: false;
    description: string;
}
