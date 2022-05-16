require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'ok',
    description: 'ok',
    run: async (message, args, client, index) => {
        var random = Math.floor(Math.random() * (17 - 7)) + 7; // it's weird but basically this makes it so piebot will send a message after a random number of messages that aren't piebot
                                                               // from 7 to 17, though I'm not sure how much the 17 max actually affects it
        message.channel.messages.fetch({ limit: random }).then(messages => {
            var authorIDs = [];
            for (let value of messages.values()) {
                authorIDs.push(value.author.id)
            }

            var botID = authorIDs.find(function (element) {
                return element == "549418373130223630"
            });

            if (!botID) {
                if(Math.ceil(Math.random() * 10) == 1) { // generates random number from 1 to 10
                    message.channel.send("Ok");
                } else {
                    message.channel.send("ok");
                }
                
            }

        });

    }
}