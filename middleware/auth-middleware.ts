import { Request, Response } from "express";

import { JwtService } from "../services";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: () => void
) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		return res
			.status(403)
			.json({ message: "error", data: "No token provided" });
	}
	const token = authorization.split(" ")[1];
	const user = JwtService.verifyAccessToken(token);
	if (!user) {
		return res.status(403).json({ message: "error", data: "Unauthorized" });
	}
	req.body.user = user;
	next();
};
