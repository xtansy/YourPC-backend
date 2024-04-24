"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
exports.Product = (0, mongoose_1.model)("Products", new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
    },
    img: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    rate: {
        required: true,
        type: Number,
    },
    type: {
        required: true,
        type: String,
    },
}, {
    versionKey: false,
}));
