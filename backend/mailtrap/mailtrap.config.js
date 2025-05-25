import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapCLient = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT,
});

export const sender = {
  email: "authflow-wt2e.onrender.com",
  name: "Akib Khan",
};
