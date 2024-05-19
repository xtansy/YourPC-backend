import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { mongoDbConnect } from "./core/mongo";
import {
    tokenRoute,
    userRoute,
    roleRoute,
    processorRoute,
    productRoute,
    motherboardRoute,
    videocardRoute,
    ramRoute,
} from "./routes";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDbConnect();

userRoute(app);
tokenRoute(app);
roleRoute(app);
processorRoute(app);
productRoute(app);
motherboardRoute(app);
videocardRoute(app);
ramRoute(app);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
