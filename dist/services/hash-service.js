"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashService {
    createHash(password) {
        return bcryptjs_1.default.hashSync(password, 8);
    }
    confirmPassword(password, hash) {
        return bcryptjs_1.default.compareSync(password, hash);
    }
}
exports.default = new HashService();
