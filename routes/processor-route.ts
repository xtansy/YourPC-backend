import { Express } from "express-serve-static-core";
import { get, create, deleteAll } from "../controllers/processor-controller";

export const processorRoute = (app: Express) => {
    app.get("/processors", get);

    app.post("/processor", create);

    app.delete("/processor/deleteAll", deleteAll);
};
