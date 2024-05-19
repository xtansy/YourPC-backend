import { Schema, model } from "mongoose";
import { Document } from "mongoose";

interface ProcessorModel {
    title: string;
    img: string;
    price: number;
    rate: number;
    type: string;
    characteristics: {
        cores: number;
        streams: number;
        baseFrequency: number;
        maxFrequency: number;
        maxCoreTemperature: number;
    };
}

export type ProcessorModelDocument = ProcessorModel & Document;

export const Processor = model<ProcessorModelDocument>(
    "Processor",
    new Schema<ProcessorModel>(
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
                cores: {
                    required: true,
                    type: Number,
                },
                streams: {
                    required: true,
                    type: Number,
                },
                baseFrequency: {
                    required: true,
                    type: Number,
                },
                maxFrequency: {
                    required: true,
                    type: Number,
                },
                maxCoreTemperature: {
                    required: true,
                    type: Number,
                },
            },
        },
        {
            versionKey: false,
        }
    )
);
