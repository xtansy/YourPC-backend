"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDbConnect = void 0;
const models_1 = require("../models");
const mongoDbConnect = () => {
    models_1.db.mongoose.set("strictQuery", false);
    models_1.db.mongoose
        .connect("mongodb+srv://admin:admin@cluster0.pc9j6.mongodb.net/shop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
        .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });
};
exports.mongoDbConnect = mongoDbConnect;
