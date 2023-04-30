"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = class UserDto {
    constructor(model) {
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
