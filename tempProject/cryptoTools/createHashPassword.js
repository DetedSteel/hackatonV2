const crypto = require('node:crypto')
const {secretKey, salt} = require('./config.json')
const bcrypt = require('bcrypt')
module.exports = {
    createHashPassword: function (password) {
        return bcrypt.hashSync(password, salt)
    },
    compare: function (passwordFirst, passwordSecond) {
        return bcrypt.compareSync(passwordFirst, passwordSecond)
    }
}