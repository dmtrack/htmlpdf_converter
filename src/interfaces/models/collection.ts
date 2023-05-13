export interface ICollectionCreate {
    name: string;
    description: string;
    userId: number;
    themeId: number;
    image: string;
}

export interface ICollectionUpdate {
    id: number;
    name: string;
    description: string;
    userId: number;
    themeId: number;
    image: string;
}

export interface ICollection {
    id: number;
    name: string;
    description: string;
    userId: number;
    themeId: number;
    themeName: string;
    image?: string;
    created: number;
}

export type ItemConfigType = {
    id?: number;
    collectionId?: number;
    hidden?: boolean;
    type: string;
    label: string;
};
