module.exports = {
    name: 'roll',
    description: "this is the dice roll command!",
    run: async (message, args, client) => {

        // Math.random() * (max - min) + min

        var min;
        var max;

        if(args.length < 1) {
            min = 1;
            max = 6;
        }
        else if (args.length == 1) {
            min = 1;
            max = args[0];
        }
        else {
            min = args[0];
            max = args[1];
        }

        var rolledNum = Math.random() * (max - min) + min;

        message.channel.send(`${message.author} rolled a ${rolledNum} out of ${max}!`)
    }
}