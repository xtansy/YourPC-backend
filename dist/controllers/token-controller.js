"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.index = void 0;
const models_1 = require("../models");
const index = async (req, res) => {
    try {
        const tokenData = await models_1.db.tokenModel.find({}).exec();
        res.json({
            message: "success",
            data: tokenData,
        });
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.index = index;
const deleteAll = async (req, res) => {
    try {
        await models_1.db.tokenModel.deleteMany({});
        res.json({
            message: "sucess",
            data: "All tokens has been deleted",
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Cannot delete all tokens",
            data: error,
        });
    }
};
exports.deleteAll = deleteAll;
