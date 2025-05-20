import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
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

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    try {
        const response = await mailtrapCLient.send({
            from: sender,
            to: recipient,
            template_uuid : "9614eeda-de13-44f9-be48-e19bd8a31ece",
            template_variables: {
                "company_info_name": "AuthFlow",
                "name": capitalizedName,
            },
        });
        console.log("Welcome email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send welcome email : ${error.message}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapCLient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        console.log('Password reset email sent successfully', response)
    } catch (error) {
        console.log('Error sending password reset email', error);
        throw new Error("Error sending password reset email", error.message)
    }
}