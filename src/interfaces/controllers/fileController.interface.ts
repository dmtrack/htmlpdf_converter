import { IUserDto } from '../../db/models/interface/log.interface';

export interface IUserResponse {
    mapRight(
        arg0: (
            user: IUserResponse
        ) => import('express-serve-static-core').Response<
            any,
            Record<string, any>,
            number
        >
    ): unknown;
    refreshToken: string;
    accessToken: string;
    user: IUserDto;
}
