/*
/**
 * Executes the specified command.
 * @param {Discord.Client} client The client instance of the bot.
 * @param {Discord.Message} message The message object that triggered this method.
 * @param {Object} options The object containing the data that the command may need.
 * @param {String} commandName The name of the command being run.
 * @returns {void}
 *_/
const executeCommand = (client, message, options, commandName) => {
  const author = message.guild ? message.member.displayName : message.author.username;
  const origin = message.guild ? message.guild.name : `DM with ${author}`;

  const command = client.commands.get(commandName);

  if (!command) {
    return;
  }

  try {
    logger.info(`User ${author} issued command ${commandName} in ${origin}.`);
    command.execute(message, options);
  } catch (err) {
    logger.error(err);
    message.reply("there's been a problem executing your command.");
  }
};*/

const splitToPlayable = (words) => {
  return new Promise((resolve, reject) => {
    const phrase = words.join(' ');
    const charCount = phrase.length;
    if (charCount <= 200) {
      resolve([phrase]);
      return;
    }

    try {
      const splitPhrases = [];
      const remainingPhrase = words.reduce((phrase, word) => {
        const wordLength = word.length;

        if (wordLength > 200) {
          throw 'one or more of your words is over 200 characters.';
        }

        if (wordLength + 1 < 200 - phrase.length) {
          phrase += `${word} `;
        } else {
          splitPhrases.push(phrase.trimEnd());
          phrase = `${word} `;
        }

        return phrase;
      }, '');

      if (remainingPhrase) {
        splitPhrases.push(remainingPhrase.trimEnd());
      }

      resolve(splitPhrases);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
    //updatePresence,
    //executeCommand,
    splitToPlayable
};