const mongoose = require('mongoose');

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    run: async (commandSent, message, args, client) => {
        message.channel.send('Calculating Ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Pong! \`Bot Latency: ${ping}ms | API Latency: ${client.ws.ping}ms\``)
        })
    }
}