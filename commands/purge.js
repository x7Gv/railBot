module.exports.run = async (bot, message, args) => {
    async function purge() {
        message.delete();

        if (!message.member.roles.find("name", "rail.mod")) {
            message.channel.send("Permission Denied: You need \`rail.mod\` role, to execute this command.")
            return;
        }

        if (isNaN(args[0])) {
            message.channel.send("please use a number as an argument \n Usage: `~purge <amount>`");
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched.size + " messages found, deleting...");

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`An Error occured: ${error}`));
            
    }

    purge();

}

module.exports.help = {
    name: "purge"
}