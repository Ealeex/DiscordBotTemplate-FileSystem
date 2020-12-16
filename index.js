// Discord Bot Template - File System
// Made by: Ethan Lee
// Github: https://github.com/Ealeex/DiscordBotTemplate-FileSystem

const { Client, Collection } = require('discord.js');
const client = new Client({disableEveryone: true, autoReconnect: true});
const fs = require('fs');
client.config = require('./config.json');
client.startTime = Date.now();
client.commands = new Collection();

console.clear();
fs.readdir(client.config.commandsDir, async(err, dirContents) => {
    if(err) throw Error(`load_Error: ${err}`);
    if(!dirContents) console.warn("load_Warning: No commands found");
    else {
        let files = dirContents.filter(f => f.split(".").pop() === 'js');
        files.map(file => {
            let command = require(`${client.config.commandsDir}/${file}`);
            client.commands.set(command.info.name.toLowerCase(), command);
            console.log(`[LOAD] Command: ${command.info.name}`);
        });
        console.log(`[LOAD] Commands loaded in ${Date.now()-client.startTime}ms`);
    }
});

client.on('ready', async () => {
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers. | ${client.config.prefix}help | Made by L33`);
    console.log(`[INVITE] - https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    const servers = client.guilds.cache.map(guild => `\n\t> '${guild.name}' with ${guild.memberCount} members.`);
    console.log(`[INFO] - ${client.user.username} is online in ${client.guilds.cache.size} servers: ${servers}.`);
    console.log(`[CREATION] - ${client.user.username} was made on '${client.user.createdAt}'`);
    console.log(`[STATUS] - ${client.user.username} loaded in ${Date.now() - client.startTime}ms.`);
});

client.on('message', async(message) => {
    if(!message.content.startsWith(client.config.prefix) || message.author.bot) return;
    args = message.content.substring(client.config.prefix.length).split(" ");
    command = client.commands.get(args.shift().toLowerCase());

    if(command) return command.run(client, message, args);

});

client.login(client.config.token);
