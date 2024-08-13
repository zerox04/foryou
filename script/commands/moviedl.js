const fetch = require("node-fetch");
const PastebinAPI = require('pastebin-js').default; // Correct import statement

function formatFont(text) {
  const fontMapping = {
    // Font mapping
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.config = {
  name: "moviedl",
  version: "1.0",
  credit: "404",
  cooldowns: 40,
  hasPermission: 0,
  description: "Get movie torrent download link by the command",
  commandCategory: "INFO",
  usePrefix: true,
  usage: "{p}{n} <movie_name>",
};

module.exports.run = async function ({ api, event, args }) {
  const search = args.join(" ");

  if (!search) {
    api.sendMessage("❎ | Please provide the name of the movie you want to search for.", event.threadID);
    return;
  }

  const searchUrl = `https://sms-bomb.vercel.app/api/torrent.php?input=${encodeURIComponent(search)}`;

  try {
    const searchResponse = await fetch(searchUrl);
    const searchResults = await searchResponse.json();

    let replyMessage = "🔍 | Search Results | 🔍\n\n";
    for (let i = 0; i < 8; i++) {
      var movie = searchResults[i];
      replyMessage += `${i + 1}. ${movie.name}\n`;
    }
    replyMessage += "\n> Reply with the number of the movie you want to get torrent link.";
    const formattedFont = formatFont(replyMessage);
    const reply = await api.sendMessage(formattedFont, event.threadID);
    const replyMessageID = reply.messageID;

    global.client.handleReply.push(replyMessageID, {
      name: this.config.name,
      author: event.senderID,
      messageID: replyMessageID,
      query: search,
      l: searchResults,
    });

  } catch (error) {
    console.error(error);
    api.sendMessage("❌ | An error occurred while fetching movie.", event.threadID);
  }
};

module.exports.handleReply = async function ({ api, event }) { // Correct function signature
  const { author, l, query } = event.handleReply; // Correct destructuring

  if (!l || event.senderID !== author) return; // Check if l exists before accessing length

  const selectedNumber = parseInt(event.body);

  if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > l.length) {
    api.sendMessage("❎ | Invalid option selected. Please reply with a valid number.", event.threadID);
    return;
  }

  try {
    const Info = l[selectedNumber - 1];

    const infoMessage = `magnet:?xt=urn:btih:${Info.info_hash}&dn=${encodeURIComponent(Info.name)}&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce`;
    const pastebin = new PastebinAPI({
      api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
      api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
    });
    const paste = await pastebin.createPaste({
      text: infoMessage,
      title: Info.name,
      format: null,
      privacy: 1,
    }).catch((error) => {
      console.error(error);
    });

    const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

    api.sendMessage(`✅ | Your requested movie download torrent link uploaded to pastebin: ${rawPaste}`, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("❌ | An error occurred while fetching movie.", event.threadID);
  }
}; 
