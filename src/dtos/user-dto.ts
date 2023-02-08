import { IUserDto } from '../db/models/interface/user.interface';

module.exports = class UserDto {
    id;
    email;
    blocked;
    access;
    tokenId;
    avatarUrl;
    isActivated;

    constructor(model: IUserDto) {
        this.id = model.id;
        this.email = model.email;
        this.blocked = model.blocked;
        this.access = model.access;
        this.tokenId = model.tokenId;
        this.avatarUrl = model.avatarUrl;
        this.isActivated = model.isActivated;
    }
};
