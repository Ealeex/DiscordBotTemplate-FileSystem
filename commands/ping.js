module.exports.run = async (client, message, args) => {
    let msg = await message.channel.send(":question:  **Ping?**");
    return msg.edit(`:ping_pong:  **Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.**`);
};

module.exports.info = {
    name: 'Ping',
    description: "Returns the bot's ping.",
    usage: ''
};