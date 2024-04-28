import { Express } from "express-serve-static-core";
import {
    create,
    deleteAll,
    deleteOne,
    get,
} from "../controllers/role-controller";

export const roleRoute = (app: Express) => {
    app.get("/roles", get);

    app.post("/role", create);

    app.delete("/role", deleteOne);

    app.delete("/role/deleteAll", deleteAll);
};
