const { BrevoClient } = require("@getbrevo/brevo");
require("dotenv").config();

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const mailSender = async (email, title, body) => {
    try {
        const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Achievo",
                email: process.env.BREVO_SENDER_EMAIL,
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: title,
            htmlContent: body,
        });

        console.log("Mail sent successfully:", result);

        return result;
    } catch (error) {
        console.log("Mail error:", error);
        throw error;
    }
};

module.exports = mailSender;