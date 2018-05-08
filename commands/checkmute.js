const fs = module.require('fs');

module.exports.run = async (bot, message, args) => {
    fs.readFile("./mutes.json", function (err, data) {
        return console.log(JSON.stringify(bot.mutes));
    });
}

module.exports.help = {
    name: "checkmute"
}