import { ObjectId } from "mongoose";
import { UserModelDocument, UserModel } from "../models/user";

export interface UserDto {
    _id: ObjectId;
    login: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
}

export const userDto = (user: UserModelDocument): UserDto => {
    return {
        _id: user._id,
        login: user.login,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        role: user.role.role,
    };
};
