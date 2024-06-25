import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    auth: {
        user: "your-pc-supp@mail.ru",
        pass: "GfJAnx7HLUs1p9ddhewK",
    },
});
