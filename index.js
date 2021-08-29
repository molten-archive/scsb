const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");

const db = require("./db.json");
const config = require("./config.json")

let user;

client.on("messageCreate", (msg) => {
	let args = msg.content.split(" ");

	if (!db[msg.author.id.toString()]) {
		db[msg.author.id.toString()] = 0;
	};

	switch (args[0]) {
		case ">upvote":
			user = msg.mentions.members.first()?.user;

			if (!user) return msg.reply("what")

			if (!db[user.id.toString()]) {
				db[user.id.toString()] = 0
			}

			if (user.id == msg.author.id) {
				return msg.reply("no.");
			}
			db[user.id.toString()] += 15;
			msg.reply(`${user.username} is up to ${db[user.id.toString()]} social credits. https://cdn.discordapp.com/attachments/829809799553482764/881596215664463882/2Q.png`);
			break;
		case ">downvote":
			user = msg.mentions.members.first()?.user;

			if (!user) return msg.reply("what")

			if (!db[user.id.toString()]) {
				db[user.id.toString()] = 0
			}

			if (user.id == msg.author.id) {
				return msg.reply("no.");
			}
			db[user.id.toString()] -= 15;
			msg.reply(`${user.username} is up to ${db[user.id.toString()]} social credits. https://cdn.discordapp.com/attachments/876273289180356619/881605049543950378/image0.png`);
			break
		case ">getscore":
			user = msg.mentions.members.first()?.user;

			if (!user) return msg.reply("what")

			msg.reply(`${user.username} has ${db[user.id.toString()]} social credits.`);
			break


	}

	fs.writeFileSync("./db.json", JSON.stringify(db))
})


client.login(config.token)
