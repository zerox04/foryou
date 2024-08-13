const axios = require("axios");

module.exports = {
    config: {
        name: "imagine",
        version: "1.0",
        credit: "riyadxRubish",
        hasPermission: 0,
        commandCategory: "Generate image",
        usages: "{prefix}sdxl [prompt]",
        usePrefix: true,
        description: "Generate an image from the provided prompt using the SDXL API."
    },

    run: async function({ api, event, args }) {
        try {
            const prompt = args.join(" ");
            if (!prompt) {
                return api.sendMessage("Please provide a prompt.", event.threadID, event.messageID);
            }

            // React with pending time reaction
            api.setMessageReaction("🫠", event.messageID);

            const apiUrl = `https://rubish-apihub.onrender.com/rubish//sdxl?prompt=${encodeURIComponent(prompt)}&apikey=rubish69`;
            const { data: imageBuffer } = await axios.get(apiUrl, { responseType: "arraybuffer" });

            // Send the image
            const sentMessage = await api.sendMessage({
                attachment: imageBuffer,
                body: "Here is the generated image:"
            }, event.threadID);

            // React with puzzle piece emoji
            api.setMessageReaction("🧩", sentMessage.messageID);

        } catch (error) {
            console.error("Error generating image:", error);
            return api.sendMessage("An error occurred while generating the image. Please try again later.", event.threadID, event.messageID);
        }
    }
}; 
