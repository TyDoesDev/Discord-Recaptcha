module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);

        if (!command) return interaction.reply({ content: 'Command not found, try again chief!' });

        if (command.userPerms.includes('BOT_ADMIN') && !client.perms.Admins.includes(interaction.user.id)) return interaction.reply({
            embeds: [
                new client.DiscordGateway.EmbedBuilder()
                .setTitle('ERROR: Invalid Permissions')
                .setColor(client.colors.Error)
                .setThumbnail(client.logo)
                .setDescription('Whoops, you do not have permission to execute this command')
                .addFields({
                    name: 'Required Permissions',
                    value: `${command.userPerms}`,
                    inline: true
                })
                .setTimestamp()
                .setFooter({
                    text: client.footer,
                    iconURL: client.logo
                })
            ],
            ephemeral: true
        });

        if (command.basePerms && !interaction.member.permissions.has(command.basePerms)) return interaction.reply({
            embeds: [
                new client.DiscordGateway.EmbedBuilder()
                .setTitle('ERROR: Invalid Permissions')
                .setColor(client.colors.Error)
                .setThumbnail(client.logo)
                .setDescription('Whoops, you do not have permission to execute this command')
                .addFields({
                    name: 'Required Permissions',
                    value: `${command.basePerms}`,
                    inline: true
                })
                .setTimestamp()
                .setFooter({
                    text: client.footer,
                    iconURL: client.logo
                })
            ],
            ephemeral: true
        })

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);

                option.options?.forEach(x => {
                    if (x.value) args.push(option.value);
                });
            } else if (option.value) args.push(option.value);
        }

        try {
            
            command.run(client, interaction, args);
        
        } catch(err) {

            await interaction.reply({
                embeds: [
                    new client.DiscordGateway.EmbedBuilder()
                    .setTitle('FATAL: Internal Error')
                    .setColor(client.colors.Error)
                    .setThumbnail(client.logo)
                    .setDescription('Whoops, something went extremely wrong')
                    .addFields({
                        name: 'Error Message',
                        value: `${err.message}`,
                        inline: true
                    })
                    .setTimestamp()
                    .setFooter({
                        text: client.footer,
                        iconURL: client.logo
                    })
                ],
                ephemeral: true
            })

            return client.logger(`Internal error: ${err.stack}`, {
                header: 'SLASH_COMMANDS_INT_ERROR',
                type: 'error'
            })
        }
    }
}