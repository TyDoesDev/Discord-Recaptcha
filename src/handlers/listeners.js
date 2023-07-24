const { log } = require('@plugins/logger/index');
const chalk = require('chalk');
const fs = require('fs');

/**
 * LOAD THE CLIENT EVENTS
 */
const loadClientEvents = async function (client) {
    const event_folders = fs.readdirSync('./src/client/events');

    for (const folder of event_folders) {
        const event_files = fs.readdirSync(`./src/client/events/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of event_files) {
            const event = require(`../client/events/${folder}/${file}`);

            if (event.name) log(`Loaded event: ${event.name} successfully`, {
                header: 'CLIENT_EVENT_LOADER',
                type: 'ready'    
            });

            else return log(`ERROR: Event: ${file} is missing a name or the name is not a string.`, {
                header: 'CLIENT_EVENT_LOADER',
                type: 'ready'
            });

            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));

            else client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

/**
 * LOAD AND REGISTER THE SLASH COMMANDS
 */
const loadSlashCommands = async function (client) {
    let slash = [];

    const command_folders = fs.readdirSync('./src/client/cmds');

    for (const folder of command_folders) {
        const command_files = fs.readdirSync(`./src/client/cmds/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`../client/cmds/${folder}/${file}`);

            if (command.name) {
                client.slash.set(command.name, command);

                slash.push(command);

                log(`Loaded Command: ${command.name} successfully`, {
                    header: 'CLIENT_COMMAND_LOADER',
                    type: 'ready'
                });
            
            } else {

                return log(`Error loading command: ${file}, it most likely has a missing name or the name is not a string`, {
                    header: 'CLIENT_COMMAND_LOADER',
                    type: 'error'
                });
            }
        }
    }

    client.on('ready', async () => {
        client.application.commands.set(slash)
        
        .then(() => log('Slash commands have been registered with the discord api', {
            header: 'DISCORD_APPLICATION_REGISTRY',
            type: 'ready'
        }))
        
        .catch(e => log(`Failed to register slash commands: ${e.stack}`, {
            header: 'DISCORD_APPLICATION_REGISTRY',
            type: 'error'
        }))
    })
}

module.exports = {
    loadClientEvents,
    loadSlashCommands
}