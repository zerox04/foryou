module.exports.config = {
    name: "bomb",
    version: "1.0",
    hasPermssion: 2,
    credits: "Kingi Charles",
    description: "SMS Bomber",
    commandCategory: "Fun",
    usePrefix: true,
    usages: "bomb [number]",
    cooldowns: 60
};

module.exports.run = async ({ api, event, args }) => {
    if (!args[0]) return api.sendMessage("📲𝙿𝚕𝚎𝚊𝚜𝚎 𝚎𝚗𝚝𝚎𝚛 𝚊 𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛 𝚝𝚑𝚊𝚝 𝚜𝚝𝚊𝚛𝚝 𝚠𝚒𝚝𝚑 01×××××××××", event.threadID, event.messageID);

    // Display "SMS Bombing Started.." message
    api.sendMessage("SMS Bombing Started..", event.threadID, event.messageID);

    // Making request to the JSON API (assuming you are using Axios)
    const axios = global.nodemodule["axios"];
    let number = args.join(" ");
    await axios.get(`https://bombapi.000webhostapp.com/oggy/api/all.php?phone=${number}`);

    // No need to return any response here
          api.sendMessage("✅SMS Sent Successfully!", event.threadID, event.messageID);
      
     else {
      // If the request failed, send an error message back to the user
      api.sendMessage("Something went wrong, please try again later", event.threadID, event.messageID);
    }
};
