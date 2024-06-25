import { Request, Response } from "express";
import { db } from "../models";

const { motherboard } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const items = await motherboard.find({}).exec();
        res.json({
            message: "Успех!",
            data: items,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Ошибка при получении мат. плат",
            error,
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { title, img, price, rate, type, characteristics } = req.body;
        const item = { title, img, price, rate, type, characteristics };
        const response = new motherboard(item);

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

        const editingItem = await motherboard.findById(id);

        if (!editingItem) {
            return res.status(404).json({
                message: "Мат. плата не найдена!",
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
            errorMessage: "Не удалось обновить мат. плату",
            error,
        });
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await motherboard.deleteMany({});
        res.json({
            message: "Успех!",
            data: "Все мат.платы были удалены",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить все мат. платы",
            error,
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const item = await motherboard.findById(id);
        if (!item) {
            return res.status(404).json({
                message: "Продукт не найден!",
            });
        }

        await motherboard.deleteOne({ _id: id });

        res.json({
            message: "Успех!",
            data: "Материнская плата была удалена",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить материнскую плату",
            error,
        });
    }
};
