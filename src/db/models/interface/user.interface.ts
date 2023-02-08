export interface IUserRegistration {
    body: {
        name: string;
        email: string;
        password: string;
        avatarUrl: string;
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
