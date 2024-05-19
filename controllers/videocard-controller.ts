import { Request, Response } from "express";
import { db } from "../models";

const { videocard } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const items = await videocard.find({}).exec();
        res.json({
            message: "Успех!",
            data: items,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении видеокарт",
            error,
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { title, img, price, rate, type, characteristics } = req.body;
        const item = { title, img, price, rate, type, characteristics };
        const response = new videocard(item);

        await response.save();

        res.json({
            message: "Успех!",
            data: response,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при создании",
            error,
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id, title, img, price, rate } = req.body;

        const editingItem = await videocard.findById(id);

        if (!editingItem) {
            return res.status(404).json({
                message: "Видеокарта не найдена!",
            });
        }

        editingItem.title = title;
        editingItem.img = img;
        editingItem.price = price;
        editingItem.rate = rate;

        await editingItem.save();

        res.json({
            message: "success",
            data: editingItem,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось обновить видеокарту",
            error,
        });
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await videocard.deleteMany({});
        res.json({
            message: "Успех!",
            data: "Все видеокарты были удалены",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить все видеокарты",
            error,
        });
    }
};
