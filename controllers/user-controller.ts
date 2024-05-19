import { Request, Response } from "express";

import { UserService, HashService, JwtService } from "../services";
import { db } from "../models";
const { user } = db;

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await user.find({}).exec();
        res.json({
            message: "success",
            data: users,
        });
    } catch (error) {
        res.json({
            errorMessage: "Ошибка при получении всех пользователей",
            error,
        });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { login, password, email, name, surname } = req.body;
        const isExist = await UserService.checkUserExist(login);
        if (isExist) {
            return res.status(403).json({
                errorMessage: "Пользователь с таким логином уже существует",
            });
        }
        const { user, accessToken, refreshToken } =
            await UserService.registration(
                login,
                password,
                name,
                surname,
                email
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
        res.json({
            errorMessage: "Ошибка при регистрации",
            error,
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
            error,
            errorMessage: error.message,
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
            errorMessage: "Ошибка при выходе",
            error,
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
            errorMessage: "Refresh error",
            error,
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        await user.findByIdAndDelete(userId);

        res.json({
            message: "sucess",
            data: "Пользователь удален",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить пользователя",
            error,
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
            errorMessage: "Не удалось удалить всех пользователей",
            error,
        });
    }
};
