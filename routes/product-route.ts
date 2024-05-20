import { Express } from "express-serve-static-core";
import { get, getById } from "../controllers/product-controller";

export const productRoute = (app: Express) => {
    app.get("/products", get);
    app.get("/product/:id", getById);
};
