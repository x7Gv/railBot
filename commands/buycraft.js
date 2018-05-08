const Discord = require('discord.js');
var BuyCraft = require('buycraft-api');
 
var api = new BuyCraft('43f9dc6ed9e9e3dd9fa5912d2b6a047cddf8476c');

module.exports.run = async (bot, message, args) => {

    store.getListing(function(err, data) {
        console.log(data);
     
    });

}

module.exports.help = {
    name: "buycraft"
}

