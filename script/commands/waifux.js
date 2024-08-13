const axios = require("axios");
const fs = require("fs");
const request = require('request');

module.exports.config = {
    name: "waifu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Riyad",
    description: "Send a waifu image",
    commandCategory: "Image",
    usePrefix: true,
    usages: "",
    cooldowns: 1,
};

module.exports.run = async ({ api, event }) => {
    const imageUrl = "https://deku-rest-api.replit.app/waifu";
    try {
        const callback = function () {
            api.sendMessage({
                body: "𝚒𝚝’𝚜 𝚢𝚘𝚞𝚛 𝚠𝚊𝚒𝚏𝚞 𝚋𝚋𝚢 🥺💋",
                attachment: fs.createReadStream(__dirname + '/cache/waifu.jpg')
            }, event.threadID, (err, messageInfo) => {
                if (err) {
                    console.error("Error sending message:", err);
                    return;
                }

                // Log message ID for debugging
                console.log("Message ID:", messageInfo.messageID);

                // Delete the sent message after 30 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        fs.unlinkSync(__dirname + '/cache/waifu.jpg');
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 30000);
            });

            // Add reaction to the message
            api.setMessageReaction("🍭", event.messageID, (err) => {}, true);
        };

        request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/waifu.jpg')).on("close", callback);
    } catch (error) {
        console.error("Error fetching waifu image:", error);
        api.sendMessage("An error occurred while fetching the waifu image.", event.threadID);

        // React with 🖕 emoji in case of error
        api.setMessageReaction("🖕", event.messageID, (err) => {}, true);
    }
}; 
