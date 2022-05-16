require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'thonktext',
    description: 'thonk text',
    run: async (message, args, client, index) => {
        message.react("975655252672008222");
    }
}