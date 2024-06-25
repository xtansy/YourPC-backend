import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { type Feedback } from "./types";

interface MotherboardModel {
    title: string;
    img: string;
    price: number;
    rate: number;
    type: string;

    characteristics: {
        memorySlots: number;
        minMemoryFrequency: number;
        maxMemoryFrequency: number;
        maxMemoryCapacity: number;
    };

    feedback: Feedback[];
}

export type MotherboardModelDocument = MotherboardModel & Document;

export const Motherboard = model<MotherboardModelDocument>(
    "Motherboard",
    new Schema<MotherboardModel>(
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
                memorySlots: {
                    required: true,
                    type: Number,
                },
                minMemoryFrequency: {
                    required: true,
                    type: Number,
                },
                maxMemoryFrequency: {
                    required: true,
                    type: Number,
                },
                maxMemoryCapacity: {
                    required: true,
                    type: Number,
                },
            },

            feedback: [
                {
                    user: {
                        required: true,
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
