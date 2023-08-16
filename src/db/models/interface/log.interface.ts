export interface IUploadRequest {
    body: {
        name: string;
        executingTime?: number;
        memory?: number;
    };
}

export interface IFileRecord {
    id: number;
    name: string;
    executingTime: number;
    memory: number;
    link: string;
    createdAt: number;
}

export interface ICreateRecord extends Omit<IFileRecord, 'id' | 'createdAt'> {}
