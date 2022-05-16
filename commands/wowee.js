module.exports = {
    name: 'wowee',
    description: 'wowee',
    run: async (message, args, client, index) => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if(randomNum < 5) {
            message.react("😂");
        } else {
            const emoji = (message.content.split(" ")[0].toLowerCase().substring(1) == "wowee") ? "<:Wowee:758396947769196575>" : "<:wowtf:775407711709036595>"
            message.channel.send(emoji);
            if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            } else {
                console.log("Does not have permission to delete message");
            }
        }

    }
}