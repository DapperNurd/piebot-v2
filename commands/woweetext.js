require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'woweetext',
    description: 'wowee text',
    run: async (message, args, client) => {
        message.react("758396947769196575");
    }
}