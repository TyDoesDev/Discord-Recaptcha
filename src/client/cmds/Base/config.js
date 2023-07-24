const CaptchaDatabase = require('@models/guilds/index')
const { InteractionTypes } = require('@configs/perms.config')
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'config',
    category: 'Info',
    description: 'All of our Captcha related commands!',
    userPerms: [],
    basePerms: [],
    options: [
        {
            name: 'view',
            description: 'View your guilds captcha settings',
            required: false,
            type: InteractionTypes.SUB_COMMAND,
        },
        {
            name: 'create',
            description: 'Create your guilds captcha config',
            required: false,
            type: InteractionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'channel',
                    description: 'The channel for captcha usage',
                    required: true,
                    type: InteractionTypes.CHANNEL
                },
                {
                    name: 'role',
                    description: 'Role to assign for completed captchas',
                    required: true,
                    type: InteractionTypes.ROLE
                },
                {
                    name: 'logs',
                    description: 'Channel to send captcha logs to',
                    required: true,
                    type: InteractionTypes.CHANNEL
                },
                {
                    name: 'status',
                    description: 'Enable or Disable the captcha service',
                    required: true,
                    type: InteractionTypes.STRING,
                    choices: [
                        {
                            name: 'Enable',
                            value: 'captcha_on'
                        },
                        {
                            name: 'Disable',
                            value: 'captcha_off'
                        }
                    ]
                }
            ]
        },
        {
            name: 'update',
            description: 'Update your guilds captcha settings',
            required: false,
            type: InteractionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'channel',
                    description: 'The channel for captcha usage',
                    required: true,
                    type: InteractionTypes.CHANNEL
                },
                {
                    name: 'role',
                    description: 'Role to assign for completed captchas',
                    required: true,
                    type: InteractionTypes.ROLE
                },
                {
                    name: 'logs',
                    description: 'Channel to send captcha logs to',
                    required: true,
                    type: InteractionTypes.CHANNEL
                },
                {
                    name: 'status',
                    description: 'Enable or Disable the captcha service',
                    required: false,
                    type: InteractionTypes.STRING,
                    choices: [
                        {
                            name: 'Enable',
                            value: 'captcha_on'
                        },
                        {
                            name: 'Disable',
                            value: 'captcha_off'
                        }
                    ]
                }
            ]
        }
    ],

    run: async(client, interaction) => {
        switch (interaction.options.getSubcommand()) {

            /**
             * VIEW CONFIG SUB COMMAND
             */
            case 'view':

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Invalid Permissions')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, it seems like you have insufficient permissions to run this command')
                        .addFields({
                            name: 'Required Permissions',
                            value: '`MODERATE_MEMBERS`',
                        })
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                })

                let g_config1 = await CaptchaDatabase.findOne({ guild: interaction.guild.id });

                if (!g_config1) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Guild config not found')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, it looks like your guild has not been configured yet, You can use the `create` config command to create one now!')
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                })

                else { 

                    let channel = await interaction.guild.channels.cache.find((c) => c.id === g_config1.channel);
                    let lchanne = await interaction.guild.channels.cache.find((c) => c.id === g_config1.logs);
                    let vrole = await interaction.guild.roles.cache.find((r) => r.id === g_config1.role);
                    
                    return interaction.reply({
                        embeds: [
                            new client.DiscordGateway.EmbedBuilder()
                            .setTitle(`Config for: ${interaction.guild.name}`)
                            .setColor(client.colors.Base)
                            .setThumbnail(interaction.guild.iconURL())
                            .setDescription('Here is your guilds captcha configuration')
                            .addFields(
                                {
                                    name: 'Channel',
                                    value: `${channel}`,
                                    inline: false
                                },
                                {
                                    name: 'status',
                                    value: `${g_config1.enabled === 'captcha_on' ? 'Enabled' : 'Disabled'}`,
                                    inline: false
                                },
                                {
                                    name: 'role',
                                    value: `${vrole}`,
                                    inline: false

                                },
                                {
                                    name: 'Logs',
                                    value: `${lchanne}`,
                                    inline: false
                                }
                            )
                            .setTimestamp()
                            .setFooter({
                                text: client.footer,
                                iconURL: client.logo
                            })
                        ]
                    })
                }
            
            break;

            case 'create':

                let g_config2 = await CaptchaDatabase.findOne({ guild: interaction.guild.id });
                let channel2 = await interaction.options.getChannel('channel');
                let status = await interaction.options.get('status');
                let vrole2 = await interaction.options.getRole('role');
                let lchannel2 = await interaction.options.getChannel('logs')

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Invalid Permissions')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, it seems like you have insufficient permissions to run this command')
                        .addFields({
                            name: 'Required Permissions',
                            value: '`MODERATE_MEMBERS`',
                        })
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                })

                if (g_config2) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Config already exists')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, looks like this guild has already been configured, maybe you meant to run the `update` config command?')
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                });

                else {

                    await CaptchaDatabase.create({
                        guild: interaction.guild.id,
                        channel: channel2.id,
                        enabled: status.value, 
                        role: vrole2.id,
                        logs: lchannel2.id
                    })
                    
                    .then(() => interaction.reply({
                        embeds: [
                            new client.DiscordGateway.EmbedBuilder()
                            .setTitle('SUCCESS: Guild config created')
                            .setColor(client.colors.Base)
                            .setThumbnail(client.logo)
                            .setDescription('Your guild config has been created successfully, for reference you can view the settings using the `view` config command')
                            .setTimestamp()
                            .setFooter({
                                text: client.footer,
                                iconURL: client.logo
                            })
                            
                        ]
                    }))

                    .catch((e) => interaction.reply({
                        embeds: [
                            new client.DiscordGateway.EmbedBuilder()
                            .setTitle('ERROR: Config creation failed')
                            .setColor(client.colors.Error)
                            .setThumbnail(client.logo)
                            .setDescription('Whoops, i was unable to create your guilds captcha config. Please try again or report this to my dev team')
                            .addFields(
                                {
                                    name: 'Error Message',
                                    value: `${e.message}`,
                                    inline: true
                                },
                                {
                                    name: 'Report Issue',
                                    value: `[https://github.com/TyDoesDev/Discord-Recaptcha/issues](https://github.com/TyDoesDev/Discord-Recaptcha/issues)`,
                                    inline: true
                                }
                            )
                            .setTimestamp()
                            .setFooter({
                                text: client.footer,
                                iconURL: client.logo
                            })
                        ]
                    }))

                }

            break;

            case 'update': 
                
                let g_config3 = await CaptchaDatabase.findOne({ guild: interaction.guild.id });
                let channel3 = await interaction.options.getChannel('channel');
                let status2 = await interaction.options.get('status');
                let vrole3 = await interaction.options.getRole('role');
                let lchannel3 = await interaction.options.getChannel('logs')

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Invalid Permissions')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, it seems like you have insufficient permissions to run this command')
                        .addFields({
                            name: 'Required Permissions',
                            value: '`MODERATE_MEMBERS`',
                        })
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                })

                if (!g_config3) return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Guild config does not exist')
                        .setColor(client.colors.Error)
                        .setThumbnail(client.logo)
                        .setDescription('Whoops, looks like your guild does not have a configuration, please run the `create` config command to create one now!')
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                });

                else {

                    g_config3.channel = channel3.id;
                    g_config3.enabled = status2.value;
                    g_config3.role = vrole3.id;
                    g_config3.logs = lchannel3.id;

                    await g_config3.save()
                    
                    .then( async () => interation.reply({
                        embeds: [
                            new client.DiscordGateway.EmbedBuilder()
                            .setTitle('SUCCESS: Guild config updated')
                            .setColor(client.colors.Base)
                            .setThumbnail(client.logo)
                            .setDescription('Your guilds captcha config has been updated! You can double check the new values by using the `view` config command')
                            .setTimestamp()
                            .setFooter({
                                text: client.footer,
                                iconURL: client.logo
                            })
                        ]
                    }))

                    .catch(async (e) => interaction.reply({
                        embeds: [
                            new client.DiscordGateway.EmbedBuilder()
                            .setTitle('ERROR: Guild config update failed')
                            .setColor(client.colors.Error)
                            .setThumbnail(client.logo)
                            .setDescription('Whoops, i was unable to update your guilds captcha config. Please try again or report this to my dev team')
                            .addFields(
                                {
                                    name: 'Error Message',
                                    value: `${e.message}`,
                                    inline: true
                                },
                                {
                                    name: 'Report Issue',
                                    value: `[https://github.com/TyDoesDev/Discord-Recaptcha/issues](https://github.com/TyDoesDev/Discord-Recaptcha/issues)`,
                                    inline: true
                                }
                            )
                        ]
                    }))
                }

            break;

            default:

                return interaction.reply({
                    embeds: [
                        new client.DiscordGateway.EmbedBuilder()
                        .setTitle('ERROR: Invalid Arguments')
                        .setColor(client.colors.Error)
                        .setDescription('Invalid arguments provided for this command')
                        .setTimestamp()
                        .setFooter({
                            text: client.footer,
                            iconURL: client.logo
                        })
                    ]
                })
        }
    }
}