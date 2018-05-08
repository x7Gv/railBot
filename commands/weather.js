const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {

        console.log(result);
        if (err) message.channel.send(err);

        if(result.length === 0) {
            message.channel.send("Please enter a valid location.")
            return;
        }

        let current = result[0].current;
        let location = result[0].location;
        
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("#19ca70")
            .addField("Timezone", `UTC ${location.timezone}`, true)
            .addField("Degree Type",`${location.degreetype}°`, true)
            .addField("Temperature", `${current.temperature} C°`, true)
            .addField("Feels Like", `${current.feelslike} C°`, true)
            .addField("Winds",current.winddisplay, true)
            .addField("Humidity", `${current.humidity}%`, true);

            message.channel.send(embed);
    });

}

module.exports.help ={
    name: "weather"
}