require('module-alias/register');
require('dotenv').config();

const Discord = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { InteractionTypes } = require('@configs/perms.config');

const { logger } = require('@plugins/logger/index');
const config = require('@configs/main.config');
const utils = require('@handlers/presence');

/**
 * INITIALIZE THE DISCORD.JS CLIENT
 */
const client = new Client({
    Intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
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
 * DEFINE CUSTOM CLIENT CALLS
 */
client.InteractionTypes = InteractionTypes;
client.DiscordGateway = Discord;
client.logger = logger;
client.config = config;
client.utils = utils;
client.logo = config.ClientLogo;
client.capt_logo = config.Recaptcha;
client.footer = config.Footer;

/**
 * LOAD EVENTS HERE
 */

/**
 * CLIENT PROCESS LOGGER
 * @private uncaughtException
 * @private unhandledRejection
 */
process.on('uncaughtException', err => {
    logger(`Uncaught Exception: ${err}`, {
        header: 'FATAL ERROR',
        type: 'error'
    })
})

process.on('unhandledRejection', (reason, promise) => {
    logger(`Unhandled Rejection: ${reason.stack}`, {
        header: 'FATAL ERROR',
        type: 'error'
    })
})

/**
 * INITIALIZE THE DISCORD CONNECTION
 */
client.login(config.Token)


