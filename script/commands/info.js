const fs = require("fs");
const request = require("request");
const moment = require("moment-timezone");

module.exports.config = {
    name: "info",
    version: "1.0.1",
    hasPermission: 0,
    credits: "Unique Riyad",
    description: "Admin and Bot info.",
    commandCategory: "Utility",
    usePrefix: true,
    cooldowns: 30,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

    const link = [
        "https://i.imgur.com/dB7qDIN.gif",
        "https://i.imgur.com/kAzWS1W.gif",
        "https://i.imgur.com/e7a4qhy.gif",
        "https://i.imgur.com/aJ3Lcir.gif",
        "https://i.imgur.com/FPHjbez.gif",
        "https://i.imgur.com/zSvns53.gif",
        "https://i.imgur.com/MpKd8rK.gif",
        "https://i.imgur.com/YaMnm8q.gif",
        "https://i.imgur.com/lpwUXda.gif"
    ];

    const callback = () => {
        api.sendMessage({
            body: `🌸 𝙰𝚍𝚖𝚒𝚗 𝚊𝚗𝚍 𝙱𝚘𝚝 𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 🤍🐝\n\n🐞 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎 : ${global.config.BOTNAME} ✨\n\n𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 𝚕𝚒𝚗𝚔 ΠΠ──♡─────ΠΠ [https://www.facebook.com/uniqueeyamin]\n\n 🪄 𝙱𝚘𝚝 𝙿𝚛𝚎𝚏𝚒𝚡: ${global.config.PREFIX} ✨\n\n🔰 𝙱𝚘𝚝 𝙾𝚠𝚗𝚎𝚛:(𝚄𝚗𝚒𝚚𝚞𝚎 𝚁𝚒𝚢𝚊𝚍) 🌥️ \n\n🕑 𝚃𝚘𝚍𝚊𝚢 𝚒𝚜 : ${juswa} \n\n☑️ 𝙱𝚘𝚝 𝚒𝚜 𝚛𝚞𝚗𝚗𝚒𝚗𝚐 ${hours}:${minutes}:${seconds}.\n🤖 𝚃𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐 ${global.config.BOTNAME} 😵‍💫`,
            attachment: fs.createReadStream(__dirname + "/zone/juswa.jpg")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/zone/juswa.jpg"));
    };

    const imageUrl = link[Math.floor(Math.random() * link.length)];
    const callbackImage = () => callback();

    request(imageUrl).pipe(fs.createWriteStream(__dirname + "/zone/juswa.jpg")).on("close", callbackImage);
};
  