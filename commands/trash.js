const gifLink = "https://tenor.com/view/spider-man3-you-are-trash-brock-your-trash-brock-youre-trash-brock-tobey-maguire-gif-19938212"

module.exports = {
    name: 'trash',
    description: "this is the trash command!",
    run: async (message, args, client) => {
        message.channel.send(gifLink);
    }
}