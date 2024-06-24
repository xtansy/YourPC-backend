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

export const update = async (req: Request, res: Response) => {
    try {
        const { user: userPayload, id, ...updateData } = req.body;
        const user = userPayload.userData;

        const processorItem = await processor.findById(id);
        const ramItem = await ram.findById(id);
        const motherboardItem = await motherboard.findById(id);
        const videocardItem = await videocard.findById(id);

        const editingItem =
            processorItem || ramItem || motherboardItem || videocardItem;

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
            updateData.feedback = newFeedback;
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
        console.log(error);
        res.status(403).json({
            errorMessage: "Не удалось обновить продукт",
            error,
        });
    }
};

export const addFeedback = async (req: Request, res: Response) => {
    try {
        const { user: userPayload, id, feedback } = req.body;
        const user = userPayload.userData;

        const processorItem = await processor.findById(id);
        const ramItem = await ram.findById(id);
        const motherboardItem = await motherboard.findById(id);
        const videocardItem = await videocard.findById(id);

        const editingItem =
            processorItem || ramItem || motherboardItem || videocardItem;

        if (!editingItem) {
            return res.status(404).json({
                message: "Продукт не найден!",
            });
        }

        feedback.user = user;

        editingItem.feedback.push(feedback);

        await editingItem.save();

        res.json({
            message: "success",
            data: editingItem,
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({
            errorMessage: "Не удалось обновить продукт",
            error,
        });
    }
};
