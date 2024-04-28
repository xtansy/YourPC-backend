import { Schema, model, Document } from "mongoose";

export interface RoleModel {
    role: "user" | "admin" | "moderator";
}

export type RoleModelDocument = RoleModel & Document;

export const Role = model<RoleModelDocument>(
    "Role",
    new Schema<RoleModel>(
        {
            role: {
                required: true,
                type: String,
            },
        },
        {
            versionKey: false,
        }
    )
);
