const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        if (!toMute) return message.channel.send("Invalid user. Did you mention valid user?");
    
        let role = message.guild.roles.find(r => r.name === "mute");
        
        if (!role || !toMute.roles.has(role.id)) return message.channel.send("Mentioned user is not muted!");

        await(toMute.removeRole(role));
        
        delete bot.mutes[toMute.id];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
            if (err) throw err;
            console.log(`The member: ${toMute.user.tag} have been unmuted from ${toMute.guild.name} by an admin`);
        });
        message.channel.send(`User ${toMute} has been unmuted.`);

        return;
    }

module.exports.help = {
    name: "unmute"
}
