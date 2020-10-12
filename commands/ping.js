module.exports.run = async (client, message, args) => {
    let msg = await message.channel.send(":question:  **Ping?**");
    msg.edit(`:ping_pong:  **Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.**`);
};

module.exports.info = {
    name: 'Ping',
    description: 'Returns the bot\'s ping.',
    usage: 'ping',
};

module.exports.settings = {
    owner: false,
    admin: false,
    runDM: true
};