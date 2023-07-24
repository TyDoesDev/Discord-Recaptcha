const mongoose = require('mongoose');

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
    verified_role: {
        type: String,
        required: true
    }
}))