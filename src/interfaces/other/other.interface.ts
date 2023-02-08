export interface IApiError extends Error {
    status: number;
    message: string;
    errors: [];
}
