import { Request, Response } from "express";
import { db } from "../models";

const { processor, user: userDb } = db;

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
            return res.status(404).json({
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
        const { user, id, ...updateData } = req.body;

        console.log("req.body", req.body);

        console.log("@@ user", user);

        const editingItem = await processor.findById(id);

        if (!editingItem) {
            return res.status(404).json({
                message: "Продукт не найден!",
            });
        }

        if (updateData.characteristics) {
            updateData.characteristics = {
                ...editingItem.characteristics,
                ...updateData.characteristics,
            };
        }

        if (updateData.feedback) {
            const newFeedback = updateData.feedback.map((item: any) => ({
                ...item,
                user,
            }));
            updateData.feedback = {
                ...editingItem.feedback,
                ...newFeedback,
            };
        }

        const updatedItem = {
            ...editingItem,
            ...updateData,
        };

        Object.assign(editingItem, updatedItem);

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

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const item = await processor.findById(id);
        if (!item) {
            return res.status(404).json({
                message: "Продукт не найден!",
            });
        }

        await processor.deleteOne({ _id: id });

        res.json({
            message: "Успех!",
            data: "Процессор был удален",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить процессор",
            error,
        });
    }
};
