import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user";
import { Product, ProductModelDocument } from "./headphones";
import { Token, TokenModelDocument } from "./token";
import { Role, RoleModelDocument } from "./role";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument>;
    product: Model<ProductModelDocument>;
    tokenModel: Model<TokenModelDocument>;
    role: Model<RoleModelDocument>;
}

export const db: Database = {
    mongoose,
    user: User,
    product: Product,
    tokenModel: Token,
    role: Role,
};
