import { Request, Response } from "express";
import { db } from "../models";

const { processor } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const processors = await processor.find({}).exec();
        res.json({
            message: "Успех!",
            data: processors,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении процессоров",
            error,
        });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const item = await processor.findById(id);

        if (!item) {
            res.status(404).json({
                errorMessage: "Не найден",
            });
        }

        res.json({
            message: "Успех!",
            data: item,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении процессоров",
            error,
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { title, img, price, rate, type, characteristics } = req.body;
        const item = { title, img, price, rate, type, characteristics };
        const response = new processor(item);

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

        const editingItem = await processor.findById(id);

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
            errorMessage: "Не удалось обновить процессор",
            error,
        });
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await processor.deleteMany({});
        res.json({
            message: "Успех!",
            data: "Все процессоры были удалены",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить все процессоры",
            error,
        });
    }
};
