module.exports.config = {
    name: "chart",
    version: "1.0",
    hasPermssion: 0,
    credits: "Horizon",
    description: "Create interactive diagrams with top 8 groups",
    commandCategory: "Box Chat",
    usages: { "prefix": "chart", "prefix" : "react with 🐰 to unsend the chart" },
    cooldowns: 20,
    usePrefix: true
};

module.exports.run = async function({ api, event }) {
    try {
        const { createReadStream, unlinkSync, writeFileSync } = require("fs-extra");
        const axios = require('axios');

        const KMath = (data) => data.reduce((a, b) => a + b, 0);
        const inbox = await api.getThreadList(100, null, ['INBOX']);
        let xx = [...inbox].filter(group => group.isSubscribed && group.isGroup);
        let kho = [], search = [], count = [];

        for (const n of xx) {
            const threadInfo = n.name;
            const threadye = n.messageCount;
            kho.push({ "name": threadInfo, "exp": (typeof threadye === "undefined") ? 0 : threadye });
        }

        kho.sort((a, b) => b.exp - a.exp);

        for (let num = 0; num < 8; num++) {
            search.push("'" + kho[num].name + "'");
            count.push(kho[num].exp);
        }

        const full = KMath(count);
        const url = `https://quickchart.io/chart?c={type:'doughnut',data:{labels:[${encodeURIComponent(search)}],datasets:[{label:'${encodeURIComponent('Tương Tác')}',data:[${encodeURIComponent(count)}]}]},options:{plugins:{doughnutlabel:{labels:[{text:'${full}',font:{size:26}},{text:'${encodeURIComponent('Total')}'}]}}}}`;

        const { data: stream } = await axios.get(url, { method: 'GET', responseType: 'arraybuffer' });
        const path = __dirname + `/cache/chart.png`;

        writeFileSync(path, Buffer.from(stream, 'utf-8'));

        const messageInfo = await api.sendMessage({ body: '', attachment: createReadStream(path) }, event.threadID);

        // Auto-unsend after 30 seconds
        setTimeout(async () => {
            await api.unsendMessage(messageInfo.messageID);
        }, 30000);

        // Periodically check for reactions to unsend the chart
        const reactionCheckInterval = setInterval(async () => {
            const reactions = await api.getMessageReactions(event.threadID, messageInfo.messageID);
            if (reactions && reactions.includes("🐰")) {
                clearInterval(reactionCheckInterval);
                await api.unsendMessage(messageInfo.messageID);
            }
        }, 5000); // Check every 5 seconds
    } catch (error) {
        console.error(error);
    }
};
