const { splitToPlayable } = require('../common/utils');

module.exports = {
    name: 'say',
    description: 'This is the say command',
    run: async (message, args, client) => {
        const { ttsPlayer, name: guildName, voice } = message.guild;
        //const connection = voice ? voice.connection : null;
        const [atLeastOneWord] = args;

        const channel = message.member.voice.channel;

        var connection = null;
        if (message.member.voice.channel) {
            connection = await channel.join();
        } else {
            message.channel.send("Please join a voice channel first!");
            return;
        }

        if (!channel) {
            message.reply('You need to be in a voice channel first.');
            return;
        }

        if (!atLeastOneWord) {
            message.reply('You need to specify a message.');
            return;
        }

        if (connection) {
            splitToPlayable(args)
            .then((phrases) => {
                ttsPlayer.say(phrases);
            })
            .catch((error) => {
                message.reply("erro1r");
            });
        } else {
            channel.join()
            .then(() => {
                console.log(`Joined ${channel.name} in ${guildName}.`);
                message.channel.send(`Joined \`${channel.name}\`.`);
                splitToPlayable(args)
                .then((phrases) => {
                    ttsPlayer.say(phrases);
                })
                .catch((error) => {
                    message.reply("error2");
                });
            })
            .catch((error) => {
                throw error;
            });
        }
    }
}