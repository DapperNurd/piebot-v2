starts = ["Looks like it's... ", "Seems to be... ", "I think it's... ", ""]

module.exports = {
    name: 'odds',
    description: "this is the odds command!",
    run: async (commandSent, message, args, client) => {
        if(args.length < 1) {
            message.channel.send('What?');
        } else {
            var scale = args[0];

            var num = Math.floor(Math.random() * 100) + 1;

            var start = starts[Math.floor(Math.random() * starts.length)]

            var randomNum = Math.floor(Math.random() * 100) + 1;
            if(randomNum == 100) {
                num = Number(scale) + 1;
            }
            
            message.channel.send(`${start}${num}%`);
    
        }
    }
}