import { Express } from "express-serve-static-core";
import {
    get,
    getById,
    update,
    addFeedback,
    deleteOne,
    deleteAllFeedbacks,
} from "../controllers/product-controller";
import { authMiddleware } from "../middleware";

export const productRoute = (app: Express) => {
    app.get("/products", get);
    app.get("/product/:id", getById);

    app.post("/products", authMiddleware, addFeedback);

    app.patch("/products", authMiddleware, update);

    app.delete("/products/:id", deleteOne);
    app.delete("/products-deleteAllFeedbacks", deleteAllFeedbacks);
};
