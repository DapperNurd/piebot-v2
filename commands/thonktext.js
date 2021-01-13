require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'thonktext',
    description: 'thonk text',
    run: async (message, args, client) => {
        message.react("798709011376635954");
    }
}