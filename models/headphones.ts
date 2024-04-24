import { Schema, model } from "mongoose";
import { Document } from "mongoose";

interface ProductModel {
    title: string;
    img: string;
    price: number;
    rate: number;
    type: string;
}

export type ProductModelDocument = ProductModel & Document;

export const Product = model<ProductModelDocument>(
    "Products",
    new Schema<ProductModel>(
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
        },
        {
            versionKey: false,
        }
    )
);
