"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDto = void 0;
const userDto = (user) => {
    return {
        _id: user._id,
        login: user.login,
        password: user.password,
    };
};
exports.userDto = userDto;
