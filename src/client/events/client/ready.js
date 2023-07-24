const { MongoClient } = require('@handlers/mongo');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        await MongoClient({ connectionURL: client.config.Mongoose });

        await client.logger('Connecting to the Discord API..', {
            header: 'CLIENT_START_UP',
            type: 'start'
        });

        try {
            await client.utils.setClientPresence(client);

            return client.logger('Connected to the Discord API Successfully', {
                header: 'CLIENT_START_UP_SUCCESS',
                type: 'ready '
            });

        } catch (err) {

            return client.logger(`Unable to establish connection: ${err.stack}`, {
                header: 'CLIENT_START_UP_FAILURE',
                type: 'error'
            });
        }
    }
}