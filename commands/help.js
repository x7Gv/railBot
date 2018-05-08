const Discord = require("discord.js");

prefix = "~";

module.exports.run = async (bot, message, args) => {
    let helpembed = new Discord.RichEmbed()
        .setTitle("Essential Commands:")
        .setColor("#19ca70")
        .setDescription(`\`${prefix}ping\` Calculates latencies between bot and API\n\`${prefix}user @<username> \` Sends user info about the mentioned user.\n\`${prefix}rHex\` Generates a random *HEX* value as an embed\n\`${prefix}weather <location>\` Sends current forecast of defined location\n\`${prefix}rWeather\` Sends current forecast of random ZIP code\n\`${prefix}flip\` Flips a coin... Nothing too simple`);

    let helpembed2 = new Discord.RichEmbed()
        .setTitle("Admin Commands:")
        .setColor("#e67e22")
        .setDescription(`\`${prefix}mute @<username> <time(sec) / optional>\` Mutes mentioned user\n\`${prefix}unmute @<username>\` Unmutes mentioned user\n\`${prefix}say <message>\` Sends message as BOT\n\`${prefix}purge <amount>\` purges defined amount of messages from channel`);
    
    let helpembed3 = new Discord.RichEmbed()
        .setTitle("Dev Commands:")
        .setColor("#f1c40f")
        .setDescription(`\`${prefix}uptime\` Shows uptime of the bot`);

        message.channel.send(helpembed);
        message.channel.send(helpembed2);
        message.channel.send(helpembed3);
}

module.exports.help = {
    name: "help",
}