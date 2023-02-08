export interface IUser {
    body: {
        name: string;
        email: string;
        password: string;
        blocked: boolean;
        isAdmin: boolean;
        avatarUrl: string;
    };
}
