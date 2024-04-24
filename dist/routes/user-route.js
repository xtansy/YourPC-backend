"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const user_controller_1 = require("../controllers/user-controller");
const userRoute = (app) => {
    app.get("/user/index", user_controller_1.index);
    app.get("/user/refresh", user_controller_1.refresh);
    app.post("/user/register", user_controller_1.register);
    app.post("/user/login", user_controller_1.login);
    app.post("/user/logout", user_controller_1.logout);
    app.delete("/user/deleteAll", user_controller_1.deleteAll);
};
exports.userRoute = userRoute;
