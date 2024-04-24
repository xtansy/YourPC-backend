"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const dtos_1 = require("../dtos");
const hash_service_1 = __importDefault(require("./hash-service"));
const jwt_service_1 = __importDefault(require("./jwt-service"));
class UserService {
    async checkUserExist(login) {
        const existUser = await models_1.db.user.findOne({ login });
        return !!existUser;
    }
    async registration(login, password) {
        const hashedPassword = hash_service_1.default.createHash(password);
        const user = new models_1.db.user({ login, password: hashedPassword });
        await user.save();
        const userData = (0, dtos_1.userDto)(user);
        const accessToken = jwt_service_1.default.createAccessToken(userData);
        const refreshToken = jwt_service_1.default.createRefreshToken(userData);
        await jwt_service_1.default.saveToken(user._id, refreshToken);
        return { user: userData, accessToken, refreshToken };
    }
    async login(login, password) {
        const existUser = await models_1.db.user.findOne({ login });
        if (!existUser) {
            throw new Error("Пользователь не найден");
        }
        const isPasswordConfirmed = hash_service_1.default.confirmPassword(password, existUser.password);
        if (!isPasswordConfirmed) {
            throw new Error("Неверный пароль");
        }
        const userData = (0, dtos_1.userDto)(existUser);
        const accessToken = jwt_service_1.default.createAccessToken(userData);
        const refreshToken = jwt_service_1.default.createRefreshToken(userData);
        await jwt_service_1.default.saveToken(existUser._id, refreshToken);
        return { user: userData, accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("Unauthorized");
        }
        const userDataOld = jwt_service_1.default.verifyRefreshToken(refreshToken);
        const tokenData = jwt_service_1.default.findTokenData(refreshToken);
        if (!userDataOld || !tokenData) {
            throw new Error("Unauthorized");
        }
        const user = await models_1.db.user.findById(userDataOld._id);
        if (!user) {
            throw new Error("Unauthorized");
        }
        const userData = (0, dtos_1.userDto)(user);
        const accessToken = jwt_service_1.default.createAccessToken(userData);
        const refreshTokenNew = jwt_service_1.default.createRefreshToken(userData);
        await jwt_service_1.default.saveToken(userData._id, refreshToken);
        return { user: userData, refreshToken: refreshTokenNew, accessToken };
    }
    async logout(refreshToken) {
        await jwt_service_1.default.removeToken(refreshToken);
    }
}
exports.default = new UserService();
