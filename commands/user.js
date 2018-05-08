const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let infoUser = message.mentions.users.first() || message.guild.member(args[0]);
    if (!infoUser) return message.channel.send("Invalid user. Did you mention valid user?");

    let userembed = new Discord.RichEmbed()
        .setThumbnail(infoUser.displayAvatarURL)
        .setAuthor("User Info")
        .setColor("#19ca70")
        .addField("Username:", infoUser.username)
        .addField("Discriminator:", infoUser.discriminator)
        .addField("ID", infoUser.id)
        .addField("User Created At:", infoUser.createdAt)
        .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL);
        
    message.channel.send(userembed);
   
}

module.exports.help = {
    name: "user",
}