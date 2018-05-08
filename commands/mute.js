const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel("Error: You do not have permission to execute this command!");
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if (!toMute) return message.channel.send("Invalid user. Did you mention a valid user?");
    
        let role = message.guild.roles.find(r => r.name === "mute");
        if(!role) {
            try {
                role = await message.guild.createRole({
                    name: "mute",
                    permissions: []
                });
    
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }
        
        if (toMute.roles.has(role.id)) return message.channel.send("The mentioned user is already muted!");

        bot.mutes[toMute.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(args[1]) * 1000
        }

        await(toMute.addRole(role));

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if(err) throw err;
            message.channel.send(`User ${toMute} has been muted.`);
        });

    }

module.exports.help = {
    name: "mute"
}