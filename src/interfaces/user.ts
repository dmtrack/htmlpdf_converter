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

// export interface IUserSignUp {
//     body: {
//         name: string;
//         email: string;
//         password: string;
//     };
// }
