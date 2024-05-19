import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user";
import { Token, TokenModelDocument } from "./token";
import { Role, RoleModelDocument } from "./role";
import { Processor, ProcessorModelDocument } from "./processor";
import { Motherboard, MotherboardModelDocument } from "./motherboard";
import { Videocard, VideocardModelDocument } from "./videocard";
import { Ram, RamModelDocument } from "./ram";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument>;
    tokenModel: Model<TokenModelDocument>;
    role: Model<RoleModelDocument>;
    processor: Model<ProcessorModelDocument>;
    motherboard: Model<MotherboardModelDocument>;
    videocard: Model<VideocardModelDocument>;
    ram: Model<RamModelDocument>;
}

export const db: Database = {
    mongoose,
    user: User,
    tokenModel: Token,
    role: Role,
    processor: Processor,
    motherboard: Motherboard,
    videocard: Videocard,
    ram: Ram,
};
