import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    auth: {},
});
