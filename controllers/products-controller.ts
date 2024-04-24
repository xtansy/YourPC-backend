import { Request, Response } from "express";
import { db } from "../models";

const { product } = db;

export const get = async (req: Request, res: Response) => {
    try {
        const headphones = await product.find({}).exec();
        res.json({
            message: "success",
            data: headphones,
        });
    } catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { title, img, price, rate, type } = req.body;
        const headphoneItem = { title, img, price, rate, type };
        const response = new product(headphoneItem);

        await response.save();

        res.json({
            message: "success",
            data: response,
        });
    } catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { productId, title, img, price, rate, type } = req.body;

        const editingProduct = await product.findById(product);

        if (!editingProduct) {
            return res.status(404).json({
                message: "Продукт не найден!",
            });
        }

        editingProduct.title = title;
        editingProduct.img = img;
        editingProduct.price = price;
        editingProduct.rate = rate;

        await editingProduct.save();

        res.json({
            message: "success",
            data: editingProduct,
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
        await product.deleteMany({});
        res.json({
            message: "sucess",
            data: "All headphones has been deleted",
        });
    } catch (error) {
        res.status(403).json({
            message: "Cannot delete all headphones",
            data: error,
        });
    }
};
