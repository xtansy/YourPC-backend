import { Schema, model } from "mongoose";
import { Document } from "mongoose";

export interface UserModel {
	login: string;
	password: string;
}

export type UserModelDocument = UserModel & Document;

export const User = model<UserModelDocument>(
	"User",
	new Schema<UserModel>(
		{
			login: {
				required: true,
				type: String,
			},
			password: {
				required: true,
				type: String,
			},
		},
		{
			versionKey: false,
		}
	)
);
