module.exports = {
    name: 'join',
    description: "this is the join command!",
    run: async (message, args, client) => {
        const channel = message.member.voice;

        if(!channel) {
            message.channel.send("You need to be in a voice channel first!");
            return;
        }

        if(!channel.joinable) {
            message.channel.send("I cannot join your voice channel!");
            return;
        }

        channel.join();
    }
}