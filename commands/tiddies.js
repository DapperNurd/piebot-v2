const fetch = require('node-fetch');

module.exports = {
    name: 'tiddies',
    description: "this is the ask command!",
    run: async (message, args, client) => {
        
        var url = `https://g.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=8`
        let response = await fetch(url);
        let json = await response.json();

        message.channel.send(json.results[0].url);
    }
}