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

export const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const processorItem = await processor.findById(id);
        const ramItem = await ram.findById(id);
        const motherboardItem = await motherboard.findById(id);
        const videocardItem = await videocard.findById(id);

        const found =
            processorItem || ramItem || motherboardItem || videocardItem;

        if (!found) {
            return res.status(404).json({
                errorMessage: "Продукт не найден",
            });
        }

        res.json({
            message: "Успех!",
            data: found,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении продукта",
            error,
        });
    }
};
