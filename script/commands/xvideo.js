const axios = require("axios");

module.exports = {
  config: {
    name: "xvdo",
    version: "1.0",
    credits: "Riyad",
    hasPermission: 0,
    description: "Search for videos and select one to view",
    commandCategory: "media",
    usePrefix: true,
    usages: "{p}xvideo <search_query>",
  },

  run: async function ({ api, event, args }) {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        api.sendMessage("Please provide a search query.", event.threadID, event.messageID);
        return;
      }

      const response = await axios.get(`https://api.xvideos.com/v1/search?q=${encodeURIComponent(searchQuery)}`);
      const videos = response.data.videos.slice(0, 5);

      if (!videos || videos.length === 0) {
        api.sendMessage("No videos found.", event.threadID, event.messageID);
        return;
      }

      let message = "Here are the top 5 videos:\n";
      for (let i = 0; i < videos.length; i++) {
        const { title } = videos[i];
        message += `${i + 1}. ${title}\n`;
      }

      api.sendMessage({ body: message }, event.threadID);

      const selectedNumber = await api.waitForMessage();
      const selectedIndex = parseInt(selectedNumber.body);

      if (isNaN(selectedIndex) || selectedIndex < 1 || selectedIndex > 5) {
        api.sendMessage("Invalid selection. Please choose a number from 1 to 5.", event.threadID);
        return;
      }

      const selectedVideo = videos[selectedIndex - 1];
      api.sendMessage({ body: `Selected video: ${selectedVideo.title}\n${selectedVideo.url}`, event.threadID });
    } catch (error) {
      console.error("Error fetching videos:", error);
      api.sendMessage("An error occurred while fetching videos.", event.threadID);
    }
  },
};
