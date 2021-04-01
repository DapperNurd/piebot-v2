module.exports = client => {
    console.log('Bot is onlineeeeeeeeeeee!');
    
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Muffin Clicker', //PIE CLICKER
            type: 'PLAYING',
            url: 'https://twitch.tv/sleeplesskyru'
        }
    });
};