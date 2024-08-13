const axios = require("axios");
const fs = require("fs");

module.exports.config = {
    name: "hentai",
    version: "1.0.0",
    credits: "Riyad",
    hasPermission: 0,
    description: "Send a random hentai image",
    commandCategory: "Image",
    usages: "{prefix}hentai",
    usePrefix: true,
    cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
    try {
        const apiUrl = "https://aihentai.co/random";
        const response = await axios.get(apiUrl);
        const imageUrl = response.data.url;

        const imageStream = await axios.get(imageUrl, { responseType: "stream" });
        const imagePath = __dirname + "/cache/hentaiimg.jpg";
        imageStream.data.pipe(fs.createWriteStream(imagePath));

        const callback = () => {
            api.sendMessage({
                body: "Here's a random hentai image for you:",
                attachment: fs.createReadStream(imagePath)
            }, event.threadID, (err, messageInfo) => {
                // Delete the sent message after 30 seconds
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID).then(() => {
                        console.log("Message unsent successfully.");
                        fs.unlinkSync(imagePath);
                    }).catch((err) => {
                        console.error("Error deleting message:", err);
                    });
                }, 30000);
            });

            // React with puzzle piece emoji
            api.setMessageReaction("🧩", event.messageID, (err) => {}, true);
        };

        callback();
    } catch (error) {
        console.error("Error fetching random hentai image:", error);
        api.sendMessage("An error occurred while fetching the hentai image.", event.threadID);
    }
}; 