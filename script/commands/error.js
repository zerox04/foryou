module.exports.config = {
    name: "error",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Riyad",//Jonell
    description: "Announce Bot maintenance due errors",
  usePrefix: true,
    commandCategory: "AdminBot",
    cooldowns: 5,
};

module.exports.run = function({ api, event, args }) {
    var fs = require("fs");
    var request = require("request");


    api.getThreadList(30, null, ["INBOX"], (err, list) => {
        if (err) { 
            console.error("ERR: "+ err);
            return;
        }
const target = args.join(" ");
          if (!target) return api.sendMessage("Please Enter Your Error Message", event.threadID);
        list.forEach(thread => {
            if(thread.isGroup == true && thread.threadID != event.threadID) {
                var link = "https://i.imgur.com/RYpRzvt.gif";  
                var callback = () => api.sendMessage({ 
                    body: `🪧 𝙖 𝙗𝙖𝙙 𝙣𝙤𝙩𝙞𝙘𝙚 𝙛𝙤𝙧 𝙚𝙫𝙚𝙧𝙮𝙤𝙣𝙚'𝙨 💔'\n𝙞 𝙛𝙞𝙣𝙙 𝙖 𝙥𝙧𝙤𝙗𝙡𝙚𝙢/𝙚𝙧𝙧𝙤𝙧 ❎\n𝙩𝙝𝙚 𝙥𝙧𝙤𝙗𝙡𝙚𝙢/𝙚𝙧𝙧𝙤𝙧 𝙞𝙨 :${target}\n 🚫`, 
                    attachment: fs.createReadStream(__dirname + "/cache/maintenance.gif")
                }, 
                thread.threadID, 
                () => { 
                    fs.unlinkSync(__dirname + "/cache/maintenance.gif");
                    console.log(`err message sent to ${thread.threadID}. Now shutting down.`);
                    process.exit(); 
                });

                return request(encodeURI(link))
                    .pipe(fs.createWriteStream(__dirname + "/cache/maintenance.gif"))
                    .on("close", callback);
            }
        });
    });

    console.log("The bot is now off for maintenance.");
};