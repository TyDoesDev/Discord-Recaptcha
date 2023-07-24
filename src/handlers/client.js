require('module-alias/register');
require('dotenv').config();

const Discord = require('discord.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { InteractionTypes } = require('@configs/perms.config');

const { log } = require('@plugins/logger/index');
const events = require('@handlers/listeners');
const config = require('@configs/main.config');
const utils = require('@handlers/presence');

/**
 * INITIALIZE THE DISCORD.JS CLIENT
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
    allowedMentions: {
        repliedUser: true,
        parse: ['roles', 'users']
    },
    partials: ['CHANNEL', 'REACTION', 'GUILD_MEMBER', 'MESSAGE', 'USER']
});

/**
 * EXPORT THE CLIENT FOR FUTURE USAGE
 */
module.exports = client;

/**
 * DEFINE CLIENT COLLECTIONS
 */
client.slash = new Collection();
client.category = new Collection();

/**
 * LOAD CLIENT EVENTS AND COMMANDS
 */
events.loadClientEvents(client);
events.loadSlashCommands(client);


/**
 * DEFINE CUSTOM CLIENT CALLS
 */
client.InteractionTypes = InteractionTypes;
client.DiscordGateway = Discord;
client.logger = log;
client.config = config;
client.utils = utils;
client.logo = config.ClientLogo;
client.capt_logo = config.Recaptcha;
client.footer = config.Footer;
client.colors = config.EmbedColors;

/**
 * LOAD EVENTS HERE
 */

/**
 * CLIENT PROCESS LOGGER
 * @private uncaughtException
 * @private unhandledRejection
 */
process.on('uncaughtException', err => {
    log(`Uncaught Exception: ${err}`, {
        header: 'FATAL ERROR',
        type: 'error'
    })
})

process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection: ${reason.stack}`, {
        header: 'FATAL ERROR',
        type: 'error'
    })
})

/**
 * INITIALIZE THE DISCORD CONNECTION
 */
client.login(config.Token)


