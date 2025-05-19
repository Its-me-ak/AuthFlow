import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemolate.js";
import { mailtrapCLient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapCLient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email Address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send verification email : ${error.message}`);
    }
}