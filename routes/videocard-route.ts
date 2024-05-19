import { Express } from "express-serve-static-core";
import { get, create, deleteAll } from "../controllers/videocard-controller";

export const videocardRoute = (app: Express) => {
    app.get("/videocards", get);

    app.post("/videocard", create);

    app.delete("/videocards/deleteAll", deleteAll);
};
