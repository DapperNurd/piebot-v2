module.exports = {
    name: 'coinflip',
    description: "this is the coinflip command!",
    run: async (message, args, client, index) => {
        var num = Math.floor(Math.random() * 101) + 1;
        var coin = "";
        if(num < 50) {
            coin = "Heads";
        }
        else if(num < 100) {
            coin = "Tails";
        }
        else if(num == 101) {
            coin = "Oh my god! It landed on it's side!";
        }
        else {
            coin = "Heads";
        }

        var coin = (Math.floor(Math.random() * 2) == 1) ? "Heads" : "Tails"
        message.channel.send(`The coin lands on... ${coin}!`)
    }
}