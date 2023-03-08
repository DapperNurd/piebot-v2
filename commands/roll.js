module.exports = {
    name: 'roll',
    description: "this is the dice roll command!",
    run: async (commandSent, message, args, client) => {

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

        // makes sure they are whole numbers
        min = Math.ceil(min);
        max = Math.floor(max);

        // max+1 because max is exclusive
        var rolledNum = Math.floor(Math.random() * ((max+1) - min) + min);

        message.channel.send(`${message.author} rolled a ${rolledNum} out of ${max}!`)
    }
}
