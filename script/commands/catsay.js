const axios = require('axios');
const fs = require("fs");
const request = require('request');

module.exports.config = {
    name: "catsay",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Riyad",
    description: "Generate an image of a cat saying the provided text.",
    commandCategory: "Image",
    usePrefix: true,
    usages: "{prefix}catsay [text]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    try {
        // Extract the text from the command arguments
        const text = args.join(" ");
        if (!text) {
            return api.sendMessage("Please provide text for the cat to say.", event.threadID, event.messageID);
        }

        // Construct the URL for the cat image with the provided text
        const imageUrl = `https://cataas.com/cat/says/${encodeURIComponent(text)}`;

        // Send the image of the cat saying the provided text
        const callback = function () {
            api.sendMessage({
                body: `Here's a cat saying "${text}":`,
                attachment: fs.createReadStream(__dirname + '/cache/catsay.jpg')
            }, event.threadID, (err, messageInfo) => {
                // Delete the sent message after 10 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        // Add reaction 😿 after unsending the message
                        api.setMessageReaction("😿", event.messageID, (err) => {}, true);
                        fs.unlinkSync(__dirname + '/cache/catsay.jpg');
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 10000);
            });

            // Add reaction 😽 when sending the image
            api.setMessageReaction("😽", event.messageID, (err) => {}, true);
        };

        request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/catsay.jpg')).on("close", callback);
    } catch (error) {
        console.error("Error generating catsay image:", error);
        api.sendMessage("An error occurred while generating the catsay image. Please try again later.", event.threadID);
    }
}; 