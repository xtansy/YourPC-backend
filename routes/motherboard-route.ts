import { Express } from "express-serve-static-core";
import {
    get,
    create,
    deleteAll,
    deleteOne,
} from "../controllers/motherboard-controller";

export const motherboardRoute = (app: Express) => {
    app.get("/motherboards", get);

    app.post("/motherboard", create);

    app.delete("/motherboards/deleteAll", deleteAll);

    app.delete("/motherboards/:id", deleteOne);
};
