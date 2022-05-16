module.exports = {
    name: 'roll',
    description: "this is the dice roll command!",
    run: async (message, args, client, index) => {

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

        var rolledNum = Math.floor(Math.random() * (max - min) + min);

        message.channel.send(`${message.author} rolled a ${rolledNum} out of ${max}!`)
    }
}