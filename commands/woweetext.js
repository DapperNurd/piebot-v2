require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = {
    name: 'woweetext',
    description: 'wowee text',
    run: async (commandSent, message, args, client) => {
        if(!(message.content.startsWith("<:") && message.content.endsWith(">"))) {
            message.react("758396947769196575");
        }
    }
}