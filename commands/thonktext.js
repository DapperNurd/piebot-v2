require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'thonktext',
    description: 'thonk text',
    run: async (commandSent, message, args, client) => {
        message.react("983576552488984586");
    }
}