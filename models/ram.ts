import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { type Feedback } from "./types";

interface RamModel {
    title: string;
    img: string;
    price: number;
    rate: number;
    type: string;
    characteristics: {
        memoryCount: number;
        clockFrequency: number;
        memoryType: string;
    };
    feedback: Feedback[];
}

export type RamModelDocument = RamModel & Document;

export const Ram = model<RamModelDocument>(
    "Ram",
    new Schema<RamModel>(
        {
            title: {
                required: true,
                type: String,
            },
            img: {
                required: true,
                type: String,
            },
            price: {
                required: true,
                type: Number,
            },
            rate: {
                required: true,
                type: Number,
            },
            type: {
                required: true,
                type: String,
            },
            characteristics: {
                memoryCount: {
                    required: true,
                    type: Number,
                },
                clockFrequency: {
                    required: true,
                    type: Number,
                },
                memoryType: {
                    required: true,
                    type: String,
                },
            },
            feedback: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                    },
                    text: String,
                    rate: Number,
                },
            ],
        },
        {
            versionKey: false,
        }
    )
);
