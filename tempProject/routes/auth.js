const User = require('../db/mongoose/models/User')
const {createHashPassword, compare} = require('../cryptoTools/createHashPassword')
const bcrypt = require('bcrypt')
const server = require('../server')

const authOpts = {
    schema: require('../schemas/auth.json'),
    handler: async (req, reply) => {
        const curUser = await User.findOne({login: req.body.login})
        if (!curUser) {
            reply.code(400).send('Incorrect login or password')
        }
        const isCorrectPassword = compare(req.body.password, curUser.password)
        if (!isCorrectPassword) {
            reply.code(400).send('Incorrect login or password')
        }
        console.log(server.jwt)
        const accessToken = server.jwt.sign(curUser._doc, {expiresIn: 86400})
        // return server.jwt
        return {accessToken}
    }
}

module.exports = function (fastify, options, next) {
    fastify.post('/signup', authOpts)
    next()
}