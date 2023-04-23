const mongoose = require('mongoose')

const schema = mongoose.Schema({
    login: 'String',
    password: 'String',
})

module.exports = mongoose.model('User', schema)