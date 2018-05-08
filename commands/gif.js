const Discord = require("discord.js");
var giphy = require('giphy-api')('reoIYG8wL6NjBOqpUlN34ayNwsPMz5Yr');

module.exports.run = async (bot, message, args) => {
    giphy.random(args.join(" "), function (err, res) {
        if (res.length === 0) return;

        var data = res.data;

        message.channel.send(data.embed_url)
    });
}

module.exports.help = {
    name: "gif"
}

