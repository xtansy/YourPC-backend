import { Express } from "express-serve-static-core";
import { get, create, deleteAll } from "../controllers/products-controller";
import { authMiddleware } from "../middleware";

export const productsRoute = (app: Express) => {
    app.get("/products", get);

    app.post("/products", create);

    app.delete("/products/deleteAll", deleteAll);
};
