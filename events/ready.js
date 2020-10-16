module.exports = client => {
    console.log('Bot is onlineeeeeeeeeeee!');
    
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Pie Clicker',
            type: 'PLAYING',
            url: 'https://twitch.tv/sleeplesskyru'
        }
    });
};