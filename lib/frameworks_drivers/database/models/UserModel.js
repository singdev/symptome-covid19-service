const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: { type: String, unique: true, require: true},
    password: { type: String, require: true},
}))
