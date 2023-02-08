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
    access: string;
    tokenId: number;
    avatarUrl: string;
    isActivated: boolean;
}
export interface IUser {
    name: string;
    email: string;
    id: number;
    blocked: boolean;
    tokenId: number;
    avatarUrl: string;
    isActivated: boolean;
}
