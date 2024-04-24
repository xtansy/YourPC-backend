import { db } from "../models";
import { userDto } from "../dtos";
import HashService from "./hash-service";
import JwtService from "./jwt-service";

class UserService {
	async checkUserExist(login: string) {
		const existUser = await db.user.findOne({ login });
		return !!existUser;
	}

	async registration(login: string, password: string) {
		const hashedPassword = HashService.createHash(password);
		const user = new db.user({ login, password: hashedPassword });
		await user.save();
		const userData = userDto(user);

		const accessToken = JwtService.createAccessToken(userData);
		const refreshToken = JwtService.createRefreshToken(userData);
		await JwtService.saveToken(user._id, refreshToken);

		return { user: userData, accessToken, refreshToken };
	}

	async login(login: string, password: string) {
		const existUser = await db.user.findOne({ login });
		if (!existUser) {
			throw new Error("Пользователь не найден");
		}
		const isPasswordConfirmed = HashService.confirmPassword(
			password,
			existUser.password
		);
		if (!isPasswordConfirmed) {
			throw new Error("Неверный пароль");
		}
		const userData = userDto(existUser);
		const accessToken = JwtService.createAccessToken(userData);
		const refreshToken = JwtService.createRefreshToken(userData);
		await JwtService.saveToken(existUser._id, refreshToken);
		return { user: userData, accessToken, refreshToken };
	}

	async refresh(refreshToken: string | undefined) {
		if (!refreshToken) {
			throw new Error("Unauthorized");
		}
		const userDataOld = JwtService.verifyRefreshToken(refreshToken);
		const tokenData = JwtService.findTokenData(refreshToken);

		if (!userDataOld || !tokenData) {
			throw new Error("Unauthorized");
		}

		const user = await db.user.findById(userDataOld._id);
		if (!user) {
			throw new Error("Unauthorized");
		}

		const userData = userDto(user);
		const accessToken = JwtService.createAccessToken(userData);
		const refreshTokenNew = JwtService.createRefreshToken(userData);
		await JwtService.saveToken(userData._id, refreshToken);

		return { user: userData, refreshToken: refreshTokenNew, accessToken };
	}

	async logout(refreshToken: string) {
		await JwtService.removeToken(refreshToken);
	}
}

export default new UserService();
