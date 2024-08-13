module.exports = {
	config: {
		name: "all",
		version: "1.2",
		credit: "NTKhang",
		countDown: 5,
		hasPermission: 1,
		description: {
			vi: "Tag tất cả thành viên trong nhóm chat của bạn",
			en: "Tag all members in your group chat"
		},
		commandCategory: "Box Chat",
		usages: {
			vi: "{prefix} [nội dung | để trống]",
			en: "{prefix} [content | empty]"
		},
		usePrefix: true
	},

	run: async function ({ api, event, args }) {
		const { participantIDs } = event;
		const lengthAllUser = participantIDs.length;
		const mentions = [];
		let body = args.join(" ") || "@all";
		let bodyLength = body.length;
		let i = 0;
		for (const uid of participantIDs) {
			let fromIndex = 0;
			if (bodyLength < lengthAllUser) {
				body += body[bodyLength - 1];
				bodyLength++;
			}
			if (body.slice(0, i).lastIndexOf(body[i]) != -1)
				fromIndex = i;
			mentions.push({
				tag: body[i],
				id: uid, fromIndex
			});
			i++;
		}
		api.sendMessage({ body, mentions }, event.threadID);
	}
}; 