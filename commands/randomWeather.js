const Discord = require("discord.js");
const weather = require("weather-js");
const randomZipCode = ["10013","11215","10001","10011","30303","10005","14202","10003","33023","20001","10025","22201","10044","33010","20011","55442","33411","21215","11201","22102","10002","33132","10024","10010","30324","10022","20002","14221","10021","43231","33442","44124","43201","11221","44102","43215","10023","33332","11211","15212","23220","02124","20005","10004","11233","02215","30022","10452","32210","21043","11203","33134","11413","55124","30024","11101","11234","30331","10012","30004","22030","53214","11220","11230","11212","33142","11530","33311","10014","10033","10314","10032","22314","35244","10451","21234","11001","20003","34221","11213","33025","55112","10454","33125","23452","45232","33314","43230","30043","40202",]

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports.run = async (bot, message, args) => {

    let zipResult = choose(randomZipCode);

    weather.find({search: zipResult, degreeType: 'C'}, function(err, result) {
        
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
    name: "rWeather"
}