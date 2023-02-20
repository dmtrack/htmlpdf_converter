export interface ICollectionCreate {
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
    image: string;
    created: number;
}
