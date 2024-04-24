import { UserDto } from "../dtos";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";

import { db } from "../models";

class JwtService {
	ACCESS_SECRET = "access";
	REFRESH_SECRET = "refresh";
	ACCESS_LIFETIME = "1d";
	REFRESH_LIFETIME = "7d";

	createAccessToken(payload: UserDto) {
		return jwt.sign({ userData: payload }, this.ACCESS_SECRET, {
			expiresIn: this.ACCESS_LIFETIME,
		});
	}

	createRefreshToken(payload: UserDto) {
		return jwt.sign({ userData: payload }, this.REFRESH_SECRET, {
			expiresIn: this.REFRESH_LIFETIME,
		});
	}

	async saveToken(userId: Schema.Types.ObjectId, refreshToken: string) {
		const tokenData = await db.tokenModel.findOne({ userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await tokenData.save();
			return tokenData;
		}
		const newTokenData = new db.tokenModel({ userId, refreshToken });
		await newTokenData.save();
		return newTokenData;
	}

	verifyAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, this.ACCESS_SECRET);
			return { user: userData };
		} catch (e) {
			return null;
		}
	}

	verifyRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, this.REFRESH_SECRET) as UserDto;
			return userData;
		} catch (e) {
			return null;
		}
	}

	async removeToken(token: string) {
		await db.tokenModel.deleteOne({ refreshToken: token });
	}

	async findTokenData(token: string) {
		return await db.tokenModel.findOne({ refreshToken: token });
	}
}

export default new JwtService();
