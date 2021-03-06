const config = require('./config.json');
const discord = require('discord.js');
const {unicode, custom} = require('./regex.js');
const client = new discord.Client();
const emoji_channel = config.channel;
client.login(config.token);
client.on('error',console.error);
client.on('message',async(msg) => {
    if (msg.guild === null) {
        return;
    }
    if (msg.channel.id != emoji_channel) {
        return;
    }
    let emoji_free = msg.content.replace(unicode,'');
    emoji_free = emoji_free.replace(custom,'');
    emoji_free = emoji_free.replace(/\s/g,'');
    //console.log(msg.content);
    if (emoji_free != '' || msg.attachments.size > 0) {
        if (msg.deletable) {
            msg.delete();
        }
    }
});
client.on('messageUpdate', (msg, new_msg) => {
    if (msg.channel_id!=emoji_channel) return;
    let emoji_free = new_msg.content.replace(unicode,'');
    emoji_free = emoji_free.replace(custom,'');
    emoji_free = emoji_free.replace(/\s/g,'');
    if (emoji_free != '') {
        if (new_msg.deletable) {
            new_msg.delete();
        }
    }
    
 });
