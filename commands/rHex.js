const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var rHex = '#'+Math.floor(Math.random()*16777215).toString(16);
    let hexembed = new Discord.RichEmbed()
    .setTitle(rHex)
    .setColor(rHex);
    
    let msg = await message.channel.send(hexembed);
}

module.exports.help = {
    name: "rHex",
}