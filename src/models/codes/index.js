const mongoose = require('mongoose');

module.exports = model('codes', new Schema({
    link: String,
    answers: [String]
}))