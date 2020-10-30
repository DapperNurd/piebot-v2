const { connection } = require("mongoose");

module.exports = {
    name: 'join',
    description: "this is the join command!",
    run: async (message, args, client) => {
        const vc = message.member.voice.channel;

        if (message.member.voice.channel) {
            const connection = await vc.join();
        } else {
            message.channel.send("Please join a voice channel first!");
        }
        if(connection) {
            message.channel.send(`Successfully connected to \`${vc.name}\``)
        }
    }
}