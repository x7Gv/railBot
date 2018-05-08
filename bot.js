const botConfig = require("./botconfig.json");
const Discord  = require("discord.js");
const fs = require("fs");

const prefix = botConfig.prefix

var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Couldn't find any commands to load");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands...`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", () => {
    console.log(`Logged is as: ${bot.user.tag}`);
    console.log(`to ${bot.guilds.size} servers.`);

    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let guildID = bot.mutes[i].guild;
            let guild = bot.guilds.get(guildID);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === "mute");
            if(!mutedRole) continue;

            if (Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);

                member.removeRole(mutedRole);
                delete bot.mutes[i];

                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if (err) throw err;
                    console.log(`The member: ${member.user.tag} have been unmuted from ${member.guild.name}`);
                });
        
            }
        }
    }, 5000)

    bot.setInterval( () => {
        upSecs++
        if (upSecs >= 60) {
            upSecs = 0
            upMins++
        }
        if (upMins >= 60) {
            upMins = 0
            upHours++
        }
        if (upHours >= 24) {
            upHours = 0
            upDays++
        }
    }, 1000)

    bot.user.setActivity("~help | for help", { type: "PLAYING" });
});

bot.on("message", async message => {
    if (message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if (!message.content.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);

    if (message.content === `${prefix}uptime`) {
        message.channel.send(`\`${upDays}d / ${upHours}h / ${upMins}min / ${upSecs}sec\``)
    }
});

bot.login(botConfig.token);