import { IUserDto } from '../../db/models/interface/user.interface';

export interface IRegistrationUserResponse {
    refreshToken: string;
    accessToken: string;
    user: IUserDto;
}
