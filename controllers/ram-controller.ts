import { Request, Response } from "express";
import { db } from "../models";

const { ram } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const processors = await ram.find({}).exec();
        res.json({
            message: "Успех!",
            data: processors,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении оп. памяти",
            error,
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { title, img, price, rate, type, characteristics } = req.body;
        const item = { title, img, price, rate, type, characteristics };
        const response = new ram(item);

        await response.save();

        res.json({
            message: "Успех!",
            data: response,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при создании оп. памяти",
            error,
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id, title, img, price, rate } = req.body;

        const editingItem = await ram.findById(id);

        if (!editingItem) {
            return res.status(404).json({
                message: "Продукт не найден!",
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
            errorMessage: "Не удалось обновить оп. память",
            error,
        });
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await ram.deleteMany({});
        res.json({
            message: "Успех!",
            data: "Вся оп. память была удалена",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить всю оп. память",
            error,
        });
    }
};
