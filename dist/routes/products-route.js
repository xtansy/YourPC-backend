"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoute = void 0;
const products_controller_1 = require("../controllers/products-controller");
const productsRoute = (app) => {
    app.get("/products", products_controller_1.get);
    app.post("/products", products_controller_1.create);
    app.delete("/products/deleteAll", products_controller_1.deleteAll);
};
exports.productsRoute = productsRoute;
