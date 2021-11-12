const gifLink = "https://tenor.com/view/spider-man3-you-are-trash-brock-your-trash-brock-youre-trash-brock-tobey-maguire-gif-19938212"
var keywords = "trash";

module.exports = {
    name: 'trash',
    description: "this is the trash command!",
    run: async (message, args, client) => {

        var rand = Math.floor(Math.random() * 100) + 1; //returns a random number from 1 to 100;

        if (rand > 90) {
            message.channel.send(gifLink);
        }
        else {
            
            var url = `https://g.tenor.com/v1/search?q=${keywords}&key=LIVDSRZULELA`
            let response = await fetch(url);
            let json = await response.json();

            const index = Math.floor(Math.random() * json.results.length);
            message.channel.send(json.results[index].url);
        }
    }
}