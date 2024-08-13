const axios = require('axios');

module.exports.config = {
    name: "pixel",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Unique Riyad",
    description: "Search for images on Pexels",
    commandCategory: "0",
  usePrefix: true,
    usages: "<query>",
    cooldowns: 5
};

module.exports.run = async function ({ args, event, api }) {
    try {
        const query = args.join(' ');
        const numResults = 8; // Default to 8 if no number is provided
        const apiKey = 'NoL8ytYlwsYIqmkLBboshW909HzoBoBnGZJbpmwAcahp5PF9TAnr9p7Z';
        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${numResults}`;

        const headers = {
            'Authorization': apiKey
        };

        const response = await axios.get(url, { headers });

        if (response.data.photos.length === 0) {
            return api.sendMessage("Sorry, I couldn't find any results.", event.threadID);
        }

        const attachments = response.data.photos.map(photo => photo.src.original);
        const imageAttachments = await Promise.all(attachments.map(url => api.getStreamFromURL(url)));

        return api.sendMessage({ body: `✅𝘛𝘏𝘌𝘙𝘌 𝘐𝘚 𝘛𝘏𝘌 𝘗𝘌𝘟𝘌𝘓𝘚 𝘙𝘌𝘚𝘜𝘓𝘛𝘚 𝘍𝘖𝘙 𝘗𝘙𝘖𝘝𝘐𝘋𝘌𝘋 "${query}" 𝑷𝒓𝒐𝒎 𝑷𝒆𝒙𝒆𝒍𝒔:`, attachment: imageAttachments }, event.threadID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while fetching the images.", event.threadID);
    }
}; 