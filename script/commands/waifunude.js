const axios = require('axios');
const fs = require("fs");
const request = require('request');

module.exports.config = {
    name: "waifunude",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Riyad",
    description: "Send a waifu nude image",
    commandCategory: "Image",
    usePrefix: false,
    usages: "",
    cooldowns: 1,
};

module.exports.run = async ({ api, event }) => {
    const imageUrl = "https://deku-rest-api.replit.app/waifu1";
    try {
        const callback = function () {
            api.sendMessage({
                body: "𝙳𝚘𝚗’𝚝 𝚜𝚎𝚎 𝚒𝚝 𝚒𝚝’𝚜 𝚊𝚍𝚞𝚕𝚝 😶",
                attachment: fs.createReadStream(__dirname + '/cache/waifu.jpg')
            }, event.threadID, (err, messageInfo) => {
                // Delete the sent message after 5 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        // Add reaction 😹 after unsending the message
                        api.setMessageReaction("😹", messageInfo.messageID, (err) => {}, true);
                        fs.unlinkSync(__dirname + '/cache/waifu.jpg');
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 5000);
            });

            // Add reaction 🥵 when sending the image
            api.setMessageReaction("🥵", event.messageID, (err) => {}, true);
        };

        request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/waifu.jpg')).on("close", callback);
    } catch (error) {
        console.error("Error fetching waifu image:", error);
        api.sendMessage("An error occurred while fetching the waifu image.", event.threadID);
    }
}; 
