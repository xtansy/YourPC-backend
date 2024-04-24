import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user";
import { Product, ProductModelDocument } from "./headphones";
import { TokenModel, TokenModelDocument } from "./token";
mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument>;
    product: Model<ProductModelDocument>;
    tokenModel: Model<TokenModelDocument>;
}

export const db: Database = {
    mongoose,
    user: User,
    product: Product,
    tokenModel: TokenModel,
};
