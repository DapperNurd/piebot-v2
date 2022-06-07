module.exports = {
    name: 'thonk',
    description: 'thonk',
    run: async (commandSent, message, args, client) => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if(randomNum < 5) {
            message.react("😂");
        } else {
            const emoji = (message.content.split(" ")[0].toLowerCase().substring(1) == "thonk") ? "<:nurdThonk:983576552488984586>" : "<:nurdThink:983576550811263036>"
            message.channel.send(emoji);
            if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            } else {
                console.log("Does not have permission to delete message");
            }
        }

    }
}