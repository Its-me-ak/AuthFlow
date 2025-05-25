// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// export const mailtrapCLient = new MailtrapClient({
//     token: process.env.MAILTRAP_TOKEN,
//     endpoint: process.env.MAILTRAP_ENDPOINT,
// });

// export const sender = {
//   email: "authflow-wt2e.onrender.com",
//   name: "Akib Khan",
// };

// resend.config.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: "onboarding@resend.dev", // Use a verified domain in Resend
  name: "Akib Khan",
};
