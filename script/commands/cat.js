const axios = require('axios');
const fs = require("fs");
const request = require('request');

module.exports.config = {
    name: "cat",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Riyad",
    description: "Send a random cat image",
    commandCategory: "Image",
    usePrefix: false,
    usages: "",
    cooldowns: 30,
};

module.exports.run = async ({ api, event }) => {
    const imageUrl = "https://cataas.com/cat";
    try {
        const callback = function () {
            api.sendMessage({
                body: "Here's a random cat image for you!",
                attachment: fs.createReadStream(__dirname + '/cache/cat.jpg')
            }, event.threadID, (err, messageInfo) => {
                // Delete the sent message after 10 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        // Add reaction 😿 after unsending the message
                        api.setMessageReaction("😿", event.messageID, (err) => {}, true);
                        fs.unlinkSync(__dirname + '/cache/cat.jpg');
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 10000);
            });

            // Add reaction 😽 when sending the image
            api.setMessageReaction("😽", event.messageID, (err) => {}, true);
        };

        request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/cat.jpg')).on("close", callback);
    } catch (error) {
        console.error("Error fetching cat image:", error);
        api.sendMessage("An error occurred while fetching the cat image.", event.threadID);
    }
}; 
