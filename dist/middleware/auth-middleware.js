"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res
            .status(403)
            .json({ message: "error", data: "No token provided" });
    }
    const token = authorization.split(" ")[1];
    const user = services_1.JwtService.verifyAccessToken(token);
    if (!user) {
        return res.status(403).json({ message: "error", data: "Unauthorized" });
    }
    req.body.user = user;
    next();
};
exports.authMiddleware = authMiddleware;
