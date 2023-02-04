export interface IUserSignUp {
    body: {
        name: string;
        email: string;
        password: string;
    };
}

export interface IUserDto {
    name: string;
    email: string;
    id: number;
    blocked: boolean;
    accessId: number;
    tokenId: number;
    avatarUrl: string;
    isActivated: boolean;
}
