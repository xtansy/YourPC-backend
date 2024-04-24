"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_1 = require("./core/mongo");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, mongo_1.mongoDbConnect)();
(0, routes_1.productsRoute)(app);
(0, routes_1.userRoute)(app);
(0, routes_1.tokenRoute)(app);
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
