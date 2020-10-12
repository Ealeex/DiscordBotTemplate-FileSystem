module.exports.run = async (client, message, args) => {
    let output = '';
    client.commands.map(command => {
        let info = command.info;
        output = output + `${info.name}${info.usage!=''?` ${info.usage}`:''}: ${info.description}\n`;
    });
    return message.channel.send(`**Command Help | [Required] {Optional}**\n` + output);
};

module.exports.info = {
    name: 'Help',
    description: "Returns command info.",
    usage: ''
};