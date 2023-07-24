module.exports = {
    name: 'invite',
    category: 'Info',
    description: 'Invite the bot to your guild',
    userPerms: [],
    basePerms: [],

    run: async(client, interaction) => {

        return interaction.reply({
            embeds: [
                new client.DiscordGateway.EmbedBuilder()
                .setTitle('My invite link')
                .setColor(client.colors.Base)
                .setThumbnail(client.logo)
                .setDescription(`Hey there ${interaction.user.globalName}, you can invite me to your guild [here](${client.config.Invite})`)
                .setTimestamp()
                .setFooter({
                    text: client.footer,
                    iconURL: client.logo
                })
            ]
        })
    }
}