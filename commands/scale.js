module.exports = {
    name: 'scale',
    description: "this is the scale command!",
    run: async (message, args, client, index) => {
        if(args.length < 2) {
            message.channel.send('What? Please phrase the command as "!scale (max) (question)"');
        } else {
            if (Number.isInteger(parseInt(args[0], 10))) {
                var scale = args[0];

                var num = Math.floor(Math.random() * scale);

                var randomNum = Math.floor(Math.random() * 100) + 1;
                if(randomNum == 100) {
                    num = Number(scale) + 1;
                }

                message.channel.send(`On a scale of 1 to ${scale}... I'd say ${num}.`);
            }
            else if (!Number.isInteger(args[0])) {
                message.channel.send("Please follow !scale with a whole number.");
            }
    
        }
    }
}