import { IUserDto } from '../db/models/interface/user.interface';
import { User } from '../db/models/users';

module.exports = class UserDto {
    id;
    email;
    blocked;
    accessId;
    tokenId;
    avatarUrl;
    isActivated;

    constructor(model: IUserDto) {
        this.id = model.id;
        this.email = model.email;
        this.blocked = model.blocked;
        this.accessId = model.accessId;
        this.tokenId = model.tokenId;
        this.avatarUrl = model.avatarUrl;
        this.isActivated = model.isActivated;
    }
};
