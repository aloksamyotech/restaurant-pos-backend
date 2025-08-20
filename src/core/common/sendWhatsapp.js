import axios from "axios";

export async function sendWhatsAppPDF({
    phoneNumber,
    templateName,
    languageCode = "en",
    bodyParams = [],
    headerParams = [],
}) {
    const url = "https://graph.facebook.com/v19.0/381472345039573/messages";
    const accessToken = "EAAfInX7lpPMBPOtY2CObXphQAve2em4ui5M90ZAkDgmZAOEzJvgdtL5PDKYSsUOddPNpxZA86uHF8ZAtT6irrwcTxZCTlBpFuy1lxnTn8fqXrDJ7LZCdnRLgXaZBBqMoZCGcke5vke5DCSkyxh8kld3eNoZCkdWQiv7cx6jEvVzaaZA12x7bVLDLyKSQa6XpJY"; 
 
    const components = [];
 
    if (headerParams.length > 0) {
        components.push({
            type: "header",
            parameters: headerParams.map((text) => ({ type: "text", text })),
        });
    }
 
    if (bodyParams.length > 0) {
        components.push({
            type: "body",
            parameters: bodyParams.map((text) => ({ type: "text", text })),
        });
    }
 
    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phoneNumber,
        type: "template",
        template: {
            name: templateName,
            language: { code: languageCode },
            components,
        },
    };
    console.log("payload",payload);
    console.log("rammm",JSON.stringify(payload, null, 2));

 
    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("✅ WhatsApp API Success:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "❌ WhatsApp API Error:",
            error?.response?.data || error.message
        );
        return { success: false, error: error?.response?.data || error.message };
    }
}