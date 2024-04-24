"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const mongoose_1 = require("mongoose");
exports.TokenModel = (0, mongoose_1.model)("Token", new mongoose_1.Schema({
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    refreshToken: {
        required: true,
        type: String,
    },
}, {
    versionKey: false,
}));
