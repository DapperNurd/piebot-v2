module.exports = {
    name: 'join',
    description: "this is the join command!",
    run: async (message, args, client) => {
        const channel = message.member.voice;

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    }
}