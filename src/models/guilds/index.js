const { Schema, model } = require('mongoose');

module.exports = model('guilds', new Schema({
    guild: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    enabled: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    logs: {
        type: String,
        required: true
    }
}))