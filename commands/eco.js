const Discord = require("discord.js");
const fs = require("fs");

let userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));

module.exports.run = (bot, message, args) => {
    if (!userData[message.author.id + message.guild.id]) userData[message.author.id + message.guild.id] = {}
    if (!userData[message.author.id + message.guild.id].money) userData[message.author.id + message.guild.id].money = 5

    fs.writeFile("Storage/userData.json", JSON.stringify(userData), (err) => {
        if (err) console.log(err);
    })
}

module.exports.help = {
    name: "eco"
}
