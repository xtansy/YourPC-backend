import { Express } from "express-serve-static-core";
import {
    get,
    getById,
    create,
    deleteAll,
} from "../controllers/processor-controller";

export const processorRoute = (app: Express) => {
    app.get("/processors", get);

    app.get("/processor/:id", getById);

    app.post("/processor", create);

    app.delete("/processor/deleteAll", deleteAll);
};
