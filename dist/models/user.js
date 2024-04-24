"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    login: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
}, {
    versionKey: false,
}));
