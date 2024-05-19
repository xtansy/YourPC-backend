import { Request, Response } from "express";
import { db } from "../models";

const { processor, ram, motherboard, videocard } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const processors = await processor.find({}).exec();
        const rams = await ram.find({}).exec();
        const motherboards = await motherboard.find({}).exec();
        const videocards = await videocard.find({}).exec();

        const products = [
            ...processors,
            ...rams,
            ...motherboards,
            ...videocards,
        ];

        res.json({
            message: "Успех!",
            data: products,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении продуктов",
            error,
        });
    }
};
