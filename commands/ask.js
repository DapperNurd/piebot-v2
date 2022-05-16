var yesOrNoResponses = ["Yep.", "Yes, definitely.", "Without a doubt.", "I believe so.", "Mhm.",
    "I wouldn't count on it.", "I don't think so.", "No way.", "Nah.", "Doubting it."]

var middleResponses = ["Could you repeat that?", "I'm not sure...", "idk", "Can't answer right now.", "One more time?", "🤔"]

var oddResponses = ["I'll let you know later.", "You know the answer to that already.", "Go bother someone else."]

module.exports = {
    name: 'ask',
    description: "this is the ask command!",
    run: async (message, args, client, index) => {
        if(args.length < 1) {
            message.channel.send("What?")
        } else {
            var randomNum = Math.floor(Math.random() * 101);

            switch (true) {
                case (randomNum < 80):
                    response = yesOrNoResponses[Math.floor(Math.random() * yesOrNoResponses.length)];
                    break;
                case (randomNum < 92):
                    response = middleResponses[Math.floor(Math.random() * middleResponses.length)];
                    break;
                case (randomNum <= 100):
                    response = oddResponses[Math.floor(Math.random() * oddResponses.length)];
                    break;
                default:
                    response = yesOrNoResponses[Math.floor(Math.random() * yesOrNoResponses.length)];
            }

            message.channel.send(response);
        }
    }
}