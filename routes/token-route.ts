import { Express } from "express-serve-static-core";
import { index, deleteAll } from "../controllers/token-controller";

export const tokenRoute = (app: Express) => {
	app.get("/token/index", index);
	app.delete("/token/deleteAll", deleteAll);
};
