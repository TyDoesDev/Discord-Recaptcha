const mongo = require('mongoose');
const { logger } = require('@plugins/logger/index');

module.exports.MongoClient = async ({ connectionURL }) => {
    
    if (!connectionURL) return logger('Invalid mongoose connection string provided', {
        header: 'INVALID_MONGO_CONNECTION_STRING',
        type: 'error'
    });

    mongo.set('strictQuery', false);

    await mongo.connect(connectionURL, {
        family: 4,
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000
    })
    
    .then(() => {

        logger('Mongoose connection established successfully', {
            header: 'MONGO_CONNECTION_SUCCESS',
            type: 'ready'
        });
    })
    
    .catch(e => {
        
        logger(`Mongoose connection failed: ${e.stack}`, {
            header: 'MONGO_CONNECTION_FAILURE',
            type: 'error'
        });
    });
}