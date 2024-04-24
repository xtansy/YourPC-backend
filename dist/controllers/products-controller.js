"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.update = exports.create = exports.get = void 0;
const models_1 = require("../models");
const { product } = models_1.db;
const get = async (req, res) => {
    try {
        const headphones = await product.find({}).exec();
        res.json({
            message: "success",
            data: headphones,
        });
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.get = get;
const create = async (req, res) => {
    try {
        const { title, img, price, rate, type } = req.body;
        const headphoneItem = { title, img, price, rate, type };
        const response = new product(headphoneItem);
        await response.save();
        res.json({
            message: "success",
            data: response,
        });
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.create = create;
const update = async (req, res) => {
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
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.update = update;
const deleteAll = async (req, res) => {
    try {
        await product.deleteMany({});
        res.json({
            message: "sucess",
            data: "All headphones has been deleted",
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Cannot delete all headphones",
            data: error,
        });
    }
};
exports.deleteAll = deleteAll;
