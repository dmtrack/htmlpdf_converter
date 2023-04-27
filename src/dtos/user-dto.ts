import { IUserDto } from '../db/models/interface/user.interface';

module.exports = class UserDto {
    name;
    id;
    email;
    blocked;
    accessId;
    tokenId;
    avatarUrl;
    isActivated;
    access;
    created;

    constructor(model: IUserDto) {
        this.name = model.name;
        this.id = model.id;
        this.email = model.email;
        this.blocked = model.blocked;
        this.accessId = model.accessId;
        this.tokenId = model.tokenId;
        this.avatarUrl = model.avatarUrl;
        this.isActivated = model.isActivated;
        this.access = model.access;
        this.created = model.created;
    }
};
