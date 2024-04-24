import { ObjectId } from "mongoose";
import { UserModelDocument, UserModel } from "../models/user";

export interface UserDto extends UserModel {
	_id: ObjectId;
}

export const userDto = (user: UserModelDocument): UserDto => {
	return {
		_id: user._id,
		login: user.login,
		password: user.password,
	};
};
