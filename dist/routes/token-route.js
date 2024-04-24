"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRoute = void 0;
const token_controller_1 = require("../controllers/token-controller");
const tokenRoute = (app) => {
    app.get("/token/index", token_controller_1.index);
    app.delete("/token/deleteAll", token_controller_1.deleteAll);
};
exports.tokenRoute = tokenRoute;
