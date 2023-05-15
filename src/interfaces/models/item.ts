import { Fields, TagType } from './common';

export interface IItemCreate {
    name: string;
    description: string;
    userId: number;
    collectionId: number;
    image: string;
    fields: Fields;
    tags: TagType[];
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

export interface ITagCount {
    tagId: number;
    count: number;
}
