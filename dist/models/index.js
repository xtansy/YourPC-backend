"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./user");
const headphones_1 = require("./headphones");
const token_1 = require("./token");
mongoose_1.default.Promise = global.Promise;
exports.db = {
    mongoose: mongoose_1.default,
    user: user_1.User,
    product: headphones_1.Product,
    tokenModel: token_1.TokenModel,
};
