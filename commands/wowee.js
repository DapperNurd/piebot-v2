module.exports = {
    name: 'wowee',
    description: 'wowee',
    run: async (message, args, client) => {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        if(randomNum < 15) {
            message.react("😂");
        } else {
            message.channel.send("<:Wowee:758396947769196575>");
            if(client.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            } else {
                console.log("Does not have permission to delete message");
            }
        }

    }
}