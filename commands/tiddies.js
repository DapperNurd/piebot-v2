const fetch = require('node-fetch');

module.exports = {
    name: 'tiddies',
    description: "this is the ask command!",
    run: async (message, args, client) => {
        
        if(args.length > 0) {
            var keywords = "anime tiddies";

            var url = `https://g.tenor.com/v1/search?q=${keywords}&key=LIVDSRZULELA`
            let response = await fetch(url);
            let json = await response.json();

            const index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);
            console.log(response);
        } 
        else {
            message.channel.send("What?")
        }

    }
}