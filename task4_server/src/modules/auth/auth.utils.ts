import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate Verification Token
export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

// Send Email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ajmainfayek733@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

export const sendEmail = async (name: string, email: string, token: string) => {
    return await transporter.sendMail({
        from: '"Task4" <task4@ilearning.com>',
        to: `${email}`,
        subject: "Verify account for Task4",
        html: `<h1>Hello! ${name}</h1>\n<p>To verify your account for <strong>Task 4</strong> click the following link:</p>\n<a href="#" target="_blank">${token}</a>`,
    });
};
