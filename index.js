const { Client, Collection } = require('discord.js');
const client = new Client({autoReconnect: true, disableMentions:'none'});
const fs = require('fs');
client.config = require('./config.json');
client.startTime = Date.now();
client.commands = new Collection();

console.clear();
console.log("[LOAD] Loading commands...")
let commandTime = Date.now();
fs.readdir(client.config.commandsDir, async(err, dirContents) => {
    if(err) throw Error(`load_Error: ${err}`);
    if(!dirContents) console.warn("load_Warn: No commands found");
    else {
        let files = dirContents.filter(f => f.split(".").pop() === 'js');
        files.map(file => {
            let command = require(`${client.config.commandsDir}/${file}`);
            client.commands.set(command.info.name.toLowerCase(), command);
            console.log(`[LOAD] ${command.info.name}`);
        });
        console.log(`[LOAD] Commands loaded in ${Date.now()-commandTime}ms`);
    }
});

client.on('ready', async() => {
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers. | ${client.config.prefix}help | Made by L33`);
    console.log(`[INVITE] - https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    const servers = client.guilds.cache.map(guild => `\n\t> '${guild.name}' with Owner '${guild.owner.user.tag}' with ${guild.memberCount}`);
    console.log(`[INFO] - ${client.user.username} is online in ${client.guilds.cache.size} servers: ${servers}.`);
    console.log(`[CREATION] - ${client.user.username} was made on '${client.user.createdAt}'`);
    console.log(`[STATUS] - ${client.user.username} loaded in ${Date.now() - client.startTime}ms`);
});

client.on('message', async(message) => {
    if(!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    args = message.content.substring(client.config.prefix.length).split(" ");
    command = client.commands.get(args.shift().toLowerCase());
    if(command) {
        if(!command.settings.runDM && message.channel.type == 'dm') 
            return message.channel.send(":x:  **This command is server only**");    
        if(command.settings.admin && !message.member.hasPermission(['ADMINISTRATOR']) && message.author.id != config.ownerID)
            return message.channel.send(":x:  **You don\'t permission to use this command**");
        if(command.settings.owner && message.author.id != client.config.ownerID) 
            return message.channel.send(":x:  **You don\'t permission to use this command**");
        console.log(`[Command] ( '${message.author.username}' has ran the command '${client.command.info.name}' on ${message.guild ? 'server \'' + message.guild.name : 'DMs ' + message.author.tag}' ${args=='' ? 'with no args' : 'with args \'' + args + '\''}. )`);
        try {
            return command.run(client, message, args);
        } catch(e) {
            return console.error(`${command.info.name}_Error: ${err}`)
        }
    }
});

client.login(client.config.token);