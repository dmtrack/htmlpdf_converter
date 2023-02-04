export interface Item {
    body: {
        collectionId: number;
        name: string;
        tag: string;
        str1?: string | null;
        str2?: string | null;
        str3?: string | null;
        txt1?: string | null;
        txt2?: string | null;
        txt3?: string | null;
        num1?: number | null;
        num2?: number | null;
        num3?: number | null;
        bool1?: boolean | null;
        bool2?: boolean | null;
        bool3?: boolean | null;
        date1?: string | null;
        date2?: string | null;
        date3?: string | null;
    };
}
