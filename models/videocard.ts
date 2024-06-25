import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { type Feedback } from "./types";

interface VideocardModel {
    title: string;
    img: string;
    price: number;
    rate: number;
    type: string;

    characteristics: {
        videoMemory: number;
        standardFrequency: number;
        turboFrequency: number;
        processorsCount: number;
        textureBlocks: number;
    };

    feedback: Feedback[];
}

export type VideocardModelDocument = VideocardModel & Document;

export const Videocard = model<VideocardModelDocument>(
    "Videocard",
    new Schema<VideocardModel>(
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
                videoMemory: {
                    required: true,
                    type: Number,
                },
                standardFrequency: {
                    required: true,
                    type: Number,
                },
                turboFrequency: {
                    required: true,
                    type: Number,
                },
                processorsCount: {
                    required: true,
                    type: Number,
                },
                textureBlocks: {
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
