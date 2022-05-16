require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'thonktext',
    description: 'thonk text',
    run: async (commandSent, message, args, client) => {
        message.react("975655252672008222");
    }
}