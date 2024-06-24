import { type UserModel } from "./user";

export interface HeatingIndicator {
    usage: number;
    temperature: number;
}

export interface Feedback {
    user: UserModel;
    text: string;
    rate: number;
}
