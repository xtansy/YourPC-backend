import { Schema, model } from "mongoose";
import { Document } from "mongoose";

interface TokenModel {
	userId: Schema.Types.ObjectId;
	refreshToken: string;
}

export type TokenModelDocument = TokenModel & Document;

export const TokenModel = model<TokenModelDocument>(
	"Token",
	new Schema<TokenModel>(
		{
			userId: {
				required: true,
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			refreshToken: {
				required: true,
				type: String,
			},
		},
		{
			versionKey: false,
		}
	)
);
