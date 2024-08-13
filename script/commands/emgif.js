const axios = require('axios');
const fs = require("fs");

module.exports.config = {
    name: "emgif",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Riyad",
    description: "Converts an emoji to a GIF",
    commandCategory: "Utility",
    usePrefix: true,
    usages: "[emoji]",
    cooldowns:20,
};

module.exports.run = async ({ api, event, args }) => {
    if (args.length === 0) {
        return api.sendMessage("Please send an emoji to convert to GIF.", event.threadID);
    }

    const emoji = args.join(" ");
    const apiUrl = `https://deku-rest-api.replit.app/emoji2gif?q=${encodeURIComponent(emoji)}`;
    
    try {
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        
        if (response.status === 200) {
            fs.writeFileSync(__dirname + `/cache/${emoji}.gif`, response.data);
            const messageInfo = await api.sendMessage({
                body: "🎗️ 𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝙶𝙸𝙵:",
                attachment: fs.createReadStream(__dirname + `/cache/${emoji}.gif`)
            }, event.threadID);
            
            // React with ✨ after sending the GIF
            api.setMessageReaction("✨", messageInfo.messageID);
            
            // Delete the sent message after 20 seconds
            setTimeout(() => {
                api.unsendMessage(messageInfo.messageID).then(() => {
                    console.log("Message unsent successfully.");
                }).catch((err) => {
                    console.error("Error deleting message:", err);
                });
            }, 20000);
        } else {
            api.sendMessage("Failed to convert emoji to GIF.", event.threadID);
        }
    } catch (error) {
        console.error("Error converting emoji to GIF:", error);
        api.sendMessage("An error occurred while converting emoji to GIF.", event.threadID);
    }
}; 