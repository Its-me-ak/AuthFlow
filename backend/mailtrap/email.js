import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { resendClient, sender } from "./resend.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Verify Your Email Address",
      html,
    });

    console.log("Verification email sent:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  try {
    const html = `
        <h1>Welcome to AuthFlow</h1>
        <p>Hi ${capitalizedName}, we're excited to have you on board!</p>
      `;

    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Welcome to AuthFlow",
      html,
    });

    console.log("Welcome email sent:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};
  

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Reset Your Password",
      html,
    });

    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: [email],
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset success email sent:", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(
      `Error sending password reset success email: ${error.message}`
    );
  }
};