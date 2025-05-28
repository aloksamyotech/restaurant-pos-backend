import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { Message } from "./constant.js";

dotenv.config();

const sendInvoiceEmail = async (email, invoicePath) => {
    try {
        if (!fs.existsSync(invoicePath)) {
            throw new Error("Invoice file not found!");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: "884d7c001@smtp-brevo.com",
                pass: "mqLz7ta4BfYJVSMh",
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Invoice for Order",
            text: "Thank you for your order! Please find the attached invoice.",
            attachments: [
                {
                    filename: path.basename(invoicePath),
                    path: invoicePath,
                },
            ],
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", email);
        return Message.data_add;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email: " + error.message);
    }
};

export default sendInvoiceEmail;
