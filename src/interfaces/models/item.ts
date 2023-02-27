export interface IItemCreate {
    name: string;
    description: string;
    userId: number;
    collectionId: number;
    image: string;
}

export interface IItemUpdate {
    id: number;
    name: string;
    description: string;
}

export interface IItem {
    id: number;
    name: string;
    description: string;
    collectionId: number;
    created: number;
}
