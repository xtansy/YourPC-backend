"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.refresh = exports.logout = exports.login = exports.register = exports.index = void 0;
const services_1 = require("../services");
const models_1 = require("../models");
const { user } = models_1.db;
const index = async (req, res) => {
    try {
        const users = await user.find({}).exec();
        res.json({
            message: "success",
            data: users,
        });
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.index = index;
const register = async (req, res) => {
    try {
        const { login, password } = req.body;
        const { user, accessToken, refreshToken } = await services_1.UserService.registration(login, password);
        const secondsIn7d = 604_800;
        res.cookie("refreshToken", refreshToken, {
            maxAge: secondsIn7d,
            httpOnly: true,
        });
        res.json({
            message: "success",
            data: { ...user, accessToken },
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const { user, accessToken, refreshToken } = await services_1.UserService.login(login, password);
        const secondsIn7d = 604_800;
        res.cookie("refreshToken", refreshToken, {
            maxAge: secondsIn7d,
            httpOnly: true,
        });
        res.json({
            message: "success",
            data: { ...user, accessToken },
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        await services_1.UserService.logout(refreshToken);
        res.clearCookie("refreshToken");
        res.json({
            message: "success",
            data: "Logout completed",
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Cannot logout",
            data: error,
        });
    }
};
exports.logout = logout;
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const { user, accessToken, refreshToken: refreshTokenNew, } = await services_1.UserService.refresh(refreshToken);
        const secondsIn7d = 604_800;
        res.cookie("refreshToken", refreshTokenNew, {
            maxAge: secondsIn7d,
            httpOnly: true,
        });
        res.json({
            message: "success",
            data: { ...user, accessToken },
        });
    }
    catch (error) {
        res.status(401).json({
            message: "error",
            data: "Unauthorized",
        });
    }
};
exports.refresh = refresh;
const deleteAll = async (req, res) => {
    try {
        await user.deleteMany({});
        res.json({
            message: "sucess",
            data: "All users has been deleted",
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Cannot delete all users",
            data: error,
        });
    }
};
exports.deleteAll = deleteAll;
