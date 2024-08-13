const d1p = ["1YdPOwBtU5ZMBOnST_tdrQNiqPWI4wXTKlnoNp18EkFBZkl3ankdeNFEvG4OQ4BJrUrLAzCvMuqDqhR32We2JQjQf8yTBELjauNShWX93MdryXnqOP9rykZ4JSNTaWWlih7jNLJ3KTd1K9Jjy5I2r5Y1Ifthq_gBi85xMRm5Om30dkpI12Z7r93-4HIcXK4zAnXyJ3NrZFVA_jQ-l-nPPTZNi6s1gEKh23ZRdfz47cwM","1kPLgIiRjV7Q1JLzozR4cjy0v-wl1hfmCgAccAHzUzGW33r2Wsu2-tq1oGwU2tEqvXSECZ-Xts40TLnEr7friDuBRCoi3HlfTK-x1ZUelJLBlZnZPkeX48zh_CZkBxVbWHVa9mZNljUv1wUN4voPy0foO9PCoW_ITsCvFj3KkWkZ-j3fCCUAzKkBXMCG5yopWFiHPdMEE6LQC6p3HLUgZNw"];
const cookie = d1p[Math.floor(Math.random() * d1p.length)];

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "bing",
    version: "1.0",
    credits: "dipto",
    hasPermssion: 0,
    usePrefix: true,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "image",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const w = await api.sendMessage("Wait koro baby < 😽", event.threadID);
  
const response = await axios.get(`${global.config.API}/dipto/dalle?prompt=${prompt}&key=dipto008&cookies=${cookie}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dalle', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `✅ |Naw Baby Tumar Generated Pic<😘`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };