"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = class UserDto {
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.blocked = model.blocked;
        this.access = model.access;
        this.tokenId = model.tokenId;
        this.avatarUrl = model.avatarUrl;
        this.isActivated = model.isActivated;
    }
};
