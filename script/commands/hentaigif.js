const axios = require("axios");
const fs = require("fs");
const request = require('request');

module.exports.config = {
    name: "hentaigif",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Riyad",
    description: "Send a hentai gif",
    commandCategory: "Image",
    usePrefix: true,
    usages: "",
    cooldowns: 1,
};

module.exports.run = async ({ api, event }) => {
    const imageUrl = "https://aio-webtool.onrender.com/api/hentaigif";
    try {
        const callback = function () {
            api.sendMessage({
                body: "Here's a hentai gif for you!",
                attachment: fs.createReadStream(__dirname + '/cache/hentaigif.gif')
            }, event.threadID, (err, messageInfo) => {
                // Delete the sent message after 30 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        fs.unlinkSync(__dirname + '/cache/hentaigif.gif');
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 30000);
            });

            // Add reaction to the message
            api.setMessageReaction("🍭", event.messageID, (err) => {}, true);
        };

        request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/hentaigif.gif')).on("close", callback);
    } catch (error) {
        console.error("Error fetching hentai gif:", error);
        api.sendMessage("An error occurred while fetching the hentai gif.", event.threadID);
        
        // React with 🖕 emoji in case of error
        api.setMessageReaction("🖕", event.messageID, (err) => {}, true);
    }
}; 
