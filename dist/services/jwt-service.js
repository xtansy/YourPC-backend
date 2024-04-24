"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
class JwtService {
    ACCESS_SECRET = "access";
    REFRESH_SECRET = "refresh";
    ACCESS_LIFETIME = "1d";
    REFRESH_LIFETIME = "7d";
    createAccessToken(payload) {
        return jsonwebtoken_1.default.sign({ userData: payload }, this.ACCESS_SECRET, {
            expiresIn: this.ACCESS_LIFETIME,
        });
    }
    createRefreshToken(payload) {
        return jsonwebtoken_1.default.sign({ userData: payload }, this.REFRESH_SECRET, {
            expiresIn: this.REFRESH_LIFETIME,
        });
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await models_1.db.tokenModel.findOne({ userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
            return tokenData;
        }
        const newTokenData = new models_1.db.tokenModel({ userId, refreshToken });
        await newTokenData.save();
        return newTokenData;
    }
    verifyAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, this.ACCESS_SECRET);
            return { user: userData };
        }
        catch (e) {
            return null;
        }
    }
    verifyRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, this.REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async removeToken(token) {
        await models_1.db.tokenModel.deleteOne({ refreshToken: token });
    }
    async findTokenData(token) {
        return await models_1.db.tokenModel.findOne({ refreshToken: token });
    }
}
exports.default = new JwtService();
