module.exports = {
    name: 'reconnecting',
    once: false,

    async execute(client) {
        return client.logger('Client is reconnecting to the discord api', {
            header: 'CLIENT_RECONNECTING',
            type: 'ready'
        })
    }
}
