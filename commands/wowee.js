module.exports = {
    name: 'wowee',
    description: 'wowee',
    run: async (message, args, client) => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if(randomNum < 12) {
            message.react("😂");
        } else {
            message.channel.send("<:wowtf:774898955544690698>");
            if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            } else {
                console.log("Does not have permission to delete message");
            }
        }

    }
}