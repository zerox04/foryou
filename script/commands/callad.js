module.exports.config = {
    name: "callad",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "jenk, riyadxJenk",
    description: "Report bot's error to admin or comment",
    commandCategory: "group",
    usages: "[Error encountered or comments]",
    cooldowns: {
        user: 5
    },
    usePrefix: true
};

module.exports.addAdminID = function(userID) {
    const configPath = __dirname + `/../config/config.json`;

    try {
        let config = require(configPath);
        if (!config.ADMIN) config.ADMIN = [];

        if (config.ADMIN.includes(userID)) return false;

        config.ADMIN.push(userID);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports.handleReply = async function({ api, event, Users, handleReply }) {
    const { type, body, senderID, messageID, threadID } = event;
    const senderName = (await Users.getNameUser(senderID)).name;

    switch (type) {
        case "reply":
            const admins = global.config.ADMIN || [];
            for (const adminID of admins) {
                api.sendMessage({
                    body: `📄 Feedback from ${senderName}:\n${body}`,
                    mentions: [{ tag: senderName, id: senderID }]
                }, adminID);
            }
            break;
        case "calladmin":
            api.sendMessage({
                body: `📌 Feedback from admin ${senderName}:\n--------\nMessage: ${body}\n--------\n»💬 Reply to this message to continue sending reports to admin`,
                mentions: [{ tag: senderName, id: senderID }]
            }, threadID);
            break;
    }
};

module.exports.run = async function({ api, event, args, Users, Threads }) {
    if (!args[0]) {
        return api.sendMessage("You have not entered the content to report", event.threadID, event.messageID);
    }

    const senderName = (await Users.getNameUser(event.senderID)).name;
    const threadInfo = (await Threads.getData(event.threadID)).threadInfo;
    const currentTime = Date.now();

    const admins = global.config.ADMIN || [];
    for (const adminID of admins) {
        api.sendMessage(`At: ${new Date(currentTime).toLocaleString()}\nYour report has been sent to the bot admins`, event.threadID);
        api.sendMessage(`👤 Report from: ${senderName}\n👨‍👩‍👧‍👧 Box: ${threadInfo.threadName}\n🔰 ID Box: ${event.threadID}\n🔷 ID Use: ${event.senderID}\n-----------------\n⚠️ Error: ${args.join(" ")}\n-----------------\nTime: ${new Date(currentTime).toLocaleString()}`, adminID);
    }
};

