const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/tmp/pixart.png';

module.exports = {
  config: {
    name: "pxart",
  	version: "1.0.0",
  	hasPermssion: 0,
    credits: "DekuxRiyad",
	  description: "Generate image in pixart",
  	commandCategory: "AI",
     usePrefix: true,
  	usages: "[prompt | style]",
  	cooldowns: 5,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    let g = `•——[Style list]——•\n\n1. Cinematic
2. Photographic
3. Anime
4. Manga
5. Digital Art
6. Pixel art
7. Fantasy art
8. Neonpunk
9. 3D Model`;

    if (!args[0]) return r('Missing prompt and style\n\n'+g);

       api.sendMessage("🕓 | 𝚙𝚡𝚊𝚛𝚝2 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝_", event.threadID);
    
    const a = args.join(" ").split(".").map((item) => (item = item.trim()));

    let b = a[0], c = a[1];
    if (!b) return r('Missing prompt!');
    if (!c) return r('Missing style!\n\n'+g);
    try {
    const d = (await get('${global.config.API2} /pixart2?prompt='+b+'&styles='+c, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}