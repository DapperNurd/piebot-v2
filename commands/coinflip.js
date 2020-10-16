module.exports = {
    name: 'coinflip',
    description: "this is the coinflip command!",
    run: async (message, args, client) => {
        var coin = (Math.floor(Math.random() * 2) == 1) ? "Heads" : "Tails"
        message.channel.send("The coin lands on... " + coin + "!")
    }
}