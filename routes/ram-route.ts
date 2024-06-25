import { Express } from "express-serve-static-core";
import {
    get,
    create,
    deleteAll,
    deleteOne,
} from "../controllers/ram-controller";

export const ramRoute = (app: Express) => {
    app.get("/rams", get);

    app.post("/ram", create);

    app.delete("/rams/deleteAll", deleteAll);
    app.delete("/rams/:id", deleteOne);
};
