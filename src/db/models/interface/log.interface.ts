export interface IUploadRequest {
    name: string;
    executingTime: number;
    memory?: number;
    link: string;
}

export interface IFileRecord {
    id: number;
    name: string;
    executingTime: number;
    memory?: number;
    link: string;
    createdAt: number;
}

export interface ICreateRecord extends Omit<IFileRecord, 'id' | 'createdAt'> {}
