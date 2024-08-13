module.exports = {
  config: {
    name: "edit",
    version: "1.0",
    credits: "No more",
    hasPermission: 0,
    description: "Edit a bot's message by replying to it with '<reply_message>'.",
    commandCategory: "owner",
    usePrefix: true,
    usage: "<reply_message>",
    cooldowns: 0
  },

  run: async function({ api, event }) {
    
  },

  handleEvent: async function ({ api, event }) {
    const targetUserId = "100084942163710";

   
    if (event.senderID.toString() === targetUserId && event.type === "message_reply") {
      const editedMessage = event.body;

      try {
       
        await api.editMessage(editedMessage, event.messageReply.messageID);
      } catch (error) {
        console.error("", error);
        api.sendMessage("", event.threadID);
      }
    }
  },
}; 