const fetch = require('node-fetch');

module.exports = {
    name: 'gifs',
    description: "this is the ask command!",
    run: async (message, args, client, index) => {

        var msgAfterCmd = message.content.substring(index);
        var argsAfterCmd = msgAfterCmd.split(/ +/);

        argsAfterCmd.shift();

        if(argsAfterCmd.length > 0) {
            var keywords = argsAfterCmd.join(" ");

            var url = `https://g.tenor.com/v1/search?q=${keywords}&key=LIVDSRZULELA`
            try {
                let response = await fetch(url);

                let json = await response.json();

                const index = Math.floor(Math.random() * json.results.length);
                message.channel.send(json.results[index].url);
            } catch(e) {
                console.log(e);
                console.log("^ Caught error ^")
                message.channel.send("https://tenor.com/view/windows-error-gif-21406993");
            }
            
        } 
        else {
            message.channel.send("What?")
        }

    }
}