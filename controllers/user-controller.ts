import { Request, Response } from "express";

import { UserService, HashService, JwtService } from "../services";
import { db } from "../models";
const { user } = db;

export const index = async (req: Request, res: Response) => {
	try {
		const users = await user.find({}).exec();
		res.json({
			message: "success",
			data: users,
		});
	} catch (error) {
		res.json({
			message: "error",
			data: JSON.stringify(error),
		});
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { login, password } = req.body;
		const { user, accessToken, refreshToken } =
			await UserService.registration(login, password);

		const secondsIn7d = 604_800;
		res.cookie("refreshToken", refreshToken, {
			maxAge: secondsIn7d,
			httpOnly: true,
		});

		res.json({
			message: "success",
			data: { ...user, accessToken },
		});
	} catch (error) {
		console.log(error);
		res.json({
			message: "error",
			data: JSON.stringify(error),
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { login, password } = req.body;
		const { user, accessToken, refreshToken } = await UserService.login(
			login,
			password
		);
		const secondsIn7d = 604_800;
		res.cookie("refreshToken", refreshToken, {
			maxAge: secondsIn7d,
			httpOnly: true,
		});
		res.json({
			message: "success",
			data: { ...user, accessToken },
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;
		await UserService.logout(refreshToken);
		res.clearCookie("refreshToken");
		res.json({
			message: "success",
			data: "Logout completed",
		});
	} catch (error) {
		res.status(403).json({
			message: "Cannot logout",
			data: error,
		});
	}
};

export const refresh = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;

		const {
			user,
			accessToken,
			refreshToken: refreshTokenNew,
		} = await UserService.refresh(refreshToken);

		const secondsIn7d = 604_800;
		res.cookie("refreshToken", refreshTokenNew, {
			maxAge: secondsIn7d,
			httpOnly: true,
		});

		res.json({
			message: "success",
			data: { ...user, accessToken },
		});
	} catch (error) {
		res.status(401).json({
			message: "error",
			data: "Unauthorized",
		});
	}
};

export const deleteAll = async (req: Request, res: Response) => {
	try {
		await user.deleteMany({});
		res.json({
			message: "sucess",
			data: "All users has been deleted",
		});
	} catch (error) {
		res.status(403).json({
			message: "Cannot delete all users",
			data: error,
		});
	}
};
