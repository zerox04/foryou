const axios = require("axios");

module.exports.config = {
    name: "ddg",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Riyad",
    description: "Search for images using DuckDuckGo",
    commandCategory: "utility",
  usePrefix: true,
    usages: "<query> [number of images]",
    cooldowns: 5
};

module.exports.run = async function ({ args, event, api }) {
    try {
        let query = args.shift();
        let numResults = args[0] ? parseInt(args[0]) : 8; // Default to 8 if no number is provided
        numResults = Math.min(Math.max(numResults, 1), 50); // Ensure numResults is within the range of 1 to 50
        const url = `https://api.duckduckgo.com/?q=${query}&format=json&iax=images&ia=images`;

        const response = await axios.get(url);

        if (!response.data.Image || response.data.Image.length === 0) {
            return api.sendMessage("Sorry, I couldn't find any results.", event.threadID);
        }

        const imageAttachments = response.data.Image.slice(0, numResults).map(image => ({ url: image.ImageURL, title: image.Title }));
        const attachmentData = await Promise.all(imageAttachments.map(async image => ({
            body: `Title: ${image.title}`,
            attachment: await api.getBuffer(image.url)
        })));

        return api.sendMessage({ body: `✅𝘛𝘏𝘌𝘙𝘌 𝘐𝘚 𝘛𝘏𝘌 𝘙𝘌𝘚𝘜𝘓𝘛𝘚 𝘍𝘖𝘙 𝘗𝘙𝘖𝘝𝘐𝘋𝘌𝘋 "${query}" 𝑷𝒓𝒐𝒎 𝑫𝑼𝑪𝑲𝑫𝑼𝑪𝑲𝑮𝑶:`, attachment: attachmentData }, event.threadID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while fetching the images.", event.threadID);
    }
};
