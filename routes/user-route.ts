import { Express } from "express-serve-static-core";
import {
    register,
    login,
    refresh,
    getAll,
    deleteAll,
    logout,
    recovery,
} from "../controllers/user-controller";

export const userRoute = (app: Express) => {
    app.get("/users", getAll);
    app.get("/user/refresh", refresh);

    app.post("/user/register", register);
    app.post("/user/login", login);
    app.post("/user/logout", logout);
    app.post("/user/recovery", recovery);

    app.delete("/user/deleteAll", deleteAll);
};
