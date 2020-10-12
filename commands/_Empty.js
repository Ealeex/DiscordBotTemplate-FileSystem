module.exports.run = async (client, message, args) => {
    if(!args[0]) {
        const commandArray = Object.keys(client.commands);
        let output = "";
        let commandHelp = {};
        for(let i = 0;i < commandArray.length; i++) {
            commandHelp = commands[commandArray[i]].help;
            output = output + `${commandHelp.name}: ${commandHelp.description}${commandArray[i+1]?'\n':''}`;
        }
        message.channel.send(output+"\n**Use >help [Command] to learn more**");
    } else {
        const command = args[0].toLowerCase();
        if(commands.hasOwnProperty(command)) {
            const commandHelp = client.commands[command].help;
            message.channel.send(`${commandHelp.name}: ${commandHelp.description}\nUsage: ${client.config.prefix+commandHelp.usage}`);
        } else {
            message.channel.send(`:x:  **Command '${command}' doesn't exist**`);
        }
    }
};

module.exports.info = {
    name: 'Help',
    description: "Sends the commands and their descriptions.",
    usage: 'help'
};

module.exports.settings = {
    owner: false,
    admin: false,
    runDM: false
};