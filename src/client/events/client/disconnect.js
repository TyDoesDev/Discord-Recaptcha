module.exports = {
    name: 'disconnect',
    once: false,

    async execute(client) {
        return client.logger('Client has been disconnected from the discord api', {
            header: 'CLIENT_DISCONNECTED',
            type: 'error'
        })
    }
}
