import { Express } from "express-serve-static-core";
import { get } from "../controllers/product-controller";

export const productRoute = (app: Express) => {
    app.get("/products", get);
};
