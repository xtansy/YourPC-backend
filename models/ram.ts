import { Schema, model } from "mongoose";
import { Document } from "mongoose";

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
        },
        {
            versionKey: false,
        }
    )
);
