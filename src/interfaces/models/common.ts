export interface Fields {
    name: string;
    [type: string]: string | number | boolean;
}

export type TagType = {
    id?: number;
    name: string;
};
