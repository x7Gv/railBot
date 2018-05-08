module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) { 
        return message.channel.send("Error: Permission denied");
    };
    const sayMessage = args.join(" ");
    message.delete();
    message.channel.send(sayMessage);
} 

module.exports.help = {
    name: "say"
}
