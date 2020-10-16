require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'ok',
    description: 'ok',
    run: async (message, args, client) => {
        var random = Math.floor(Math.random() * (17 - 4)) + 4;
        message.channel.messages.fetch({ limit: random }).then(messages => {
            var authorIDs = [];
            for (let value of messages.values()) {
                authorIDs.push(value.author.id)
            }

            var botID = authorIDs.find(function (element) {
                return element == "762880889817530368"
            });

            if (!botID) {
                message.channel.send("ok");
            }

        });

    }
}