const Discord = require("discord.js");

const coin1 = "1"
const coin2 = "2"

let sides = [coin1,coin2]

function choose(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

module.exports.run = async (bot, message, args) => {
    
    const result = choose(sides)

    if (result === "1") {
        const embed1 = new Discord.RichEmbed()
            .setAuthor("Heads")
            .setImage("https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=9627854")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL);

        message.channel.send(embed1);
    }

    if (result === "2") {
        const embed2 = new Discord.RichEmbed()
            .setAuthor("Tails")
            .setImage("https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=9627852")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL);

        message.channel.send(embed2);
    }
}


module.exports.help = {
    name: "flip"
}
