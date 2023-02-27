export interface IUserSignUp {
    body: {
        name: string;
        email: string;
        password: string;
    };
}

export interface IToken {
    id: number;
    refreshToken: string;
    userId: number;
}
//comm
