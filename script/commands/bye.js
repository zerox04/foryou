module.exports.config = {
	name: "bye",
     	version: "1.0.5",
	hasPermssion: 0,
	credits: "Unique Riyad", 
	description: "No prefix",
	commandCategory: "null",
  usePrefix: true,
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("By")==0 || (event.body.indexOf("by")==0 || (event.body.indexOf("bye")==0 || (event.body.indexOf("Bye")==0)))) {
		var msg = {
				body: "okh, Allah Hafeez 🖤😌"
			}
			api.sendMessage(msg, threadID, messageID);
setTimeout(() => {
api.sendMessage({sticker: "162332973951561"}, threadID, messageID)
}, 3)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }