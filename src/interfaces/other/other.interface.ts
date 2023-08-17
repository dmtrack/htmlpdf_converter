export interface IFileError extends Error {
    status: number;
    message: string;
    errors: [];
}

export interface File {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: ArrayBuffer;
}
