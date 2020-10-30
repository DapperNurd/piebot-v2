const { splitToPlayable } = require('../common/utils');

module.exports = {
    name: 'say',
    description: 'This is the say command',
    run: async (message, args, client) => {
        const { channel } = message.member.voice;
        const { ttsPlayer, name: guildName, voice } = message.guild;
        const connection = voice ? voice.connection : null;
        const [atLeastOneWord] = args;

        if (!channel) {
            message.reply('you need to be in a voice channel first.');
            return;
        }

        if (!channel.joinable) {
            message.reply('I cannot join your voice channel.');
            return;
        }

        if (!atLeastOneWord) {
            message.reply('you need to specify a message.');
            return;
        }

        if (connection) {
            splitToPlayable(args)
            .then((phrases) => {
                ttsPlayer.say(phrases);
            })
            .catch((error) => {
                message.reply(error);
            });
        } else {
            channel.join()
            .then(() => {
                console.log(`Joined ${channel.name} in ${guildName}.`);
                message.channel.send(`Joined ${channel}.`);
                splitToPlayable(args)
                .then((phrases) => {
                    ttsPlayer.say(phrases);
                })
                .catch((error) => {
                    message.reply(error);
                });
            })
            .catch((error) => {
                throw error;
            });
        }
    }
}