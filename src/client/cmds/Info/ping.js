module.exports = {
    name: 'ping',
    category: 'Info',
    description: 'View the bots latency and response time',
    userPerms: [],
    basePerms: [],

    run: async(client, interaction) => {

        return interaction.reply({
            embeds: [
                new client.DiscordGateway.EmbedBuilder()
                .setTitle('🏓 Ping - Pong')
                .setColor(client.colors.Base)
                .setThumbnail(client.logo)
                .setDescription('Is it bad?')
                .addFields(
                    {
                        name: 'Websocket',
                        value: `\`${Math.round(client.ws.ping)}ms\``,
                        inline: true
                    },
                    {
                        name: 'Latency',
                        value: `\`${Date.now() - interaction.createdTimestamp}ms\``,
                        inline: true
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
}