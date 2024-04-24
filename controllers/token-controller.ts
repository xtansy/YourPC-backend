import { Request, Response } from "express";
import { db } from "../models";

export const index = async (req: Request, res: Response) => {
	try {
		const tokenData = await db.tokenModel.find({}).exec();
		res.json({
			message: "success",
			data: tokenData,
		});
	} catch (error) {
		res.json({
			message: "error",
			data: JSON.stringify(error),
		});
	}
};

export const deleteAll = async (req: Request, res: Response) => {
	try {
		await db.tokenModel.deleteMany({});
		res.json({
			message: "sucess",
			data: "All tokens has been deleted",
		});
	} catch (error) {
		res.status(403).json({
			message: "Cannot delete all tokens",
			data: error,
		});
	}
};
