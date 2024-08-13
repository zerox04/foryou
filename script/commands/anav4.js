const axios = require("axios");

module.exports.config = {
  name: "Ana",
  version: "2.0.5",
  hasPermssion: 0, 
  credits: "asifxdiptoxkenial", 
  description: "Sim simi",
  usePrefix: false,
  commandCategory: "ChatBots",
  cooldowns:2, 
};
module.exports.handleReply = async function ({ api, event, handleReply }) {
 //api.unsendMessage(handleReply.messageID);
  if (event.type == "message_reply") {
  const reply = event.body.toLowerCase();
  if (isNaN(reply)) {
    const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${encodeURIComponent(reply)}&filter=true`)
       const ok = response.data.success;
    await api.sendMessage(ok ,event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: ok
  })},event.messageID)
  }
}
  //----------//
  if (event.type == "message_reply") {
  const reply = event.body.toLowerCase();
  if (isNaN(reply)) {
    const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${encodeURIComponent(reply)}&filter=true`)
       const yy = response.data.success;
    await api.sendMessage(yy,event.threadID,event.messageID)
  }
  }
}
module.exports.run = async function ({ api, args, event }) {
  try {
 const dipto = args.join(" ").toLowerCase();
    const rText = ["Are babu tmi naki 😱", " bolo bby 😚", "He amr jantus 🫶", "Ato dako kn 🙄", "Hea bby 🫥", "hm bolo go 🥺"];
    const text = rText[Math.floor(Math.random() * rText.length)];
    if (!args[0]) {
      api.sendMessage(text,
  event.threadID,  event.messageID ); 
      return;
    }
    if (dipto) {
    const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=bn&message=${encodeURIComponent(dipto)}&filter=true`)
       const mg = response.data.success;
      await api.sendMessage({body: mg ,},event.threadID,(error, info) => {
  global.client.handleReply.push({
    name: this.config.name,
    type: 'reply',
    messageID: info.messageID,
    author: event.senderID,
    link: mg
  })},event.messageID);
    }
  } catch (error) {console.error(`Failed to get an answer: ${error.message}`);
api.sendMessage(`${error.message}.\nAn error`,event.threadID,event.messageID);}
};