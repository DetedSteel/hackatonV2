const createHash = require('../cryptoTools/createHashPassword')
const User = require('../db/mongoose/models/User')
const omit = require('lodash/omit')
const pick = require('lodash/pick')
const {createHashPassword} = require("../cryptoTools/createHashPassword");
const repl = require("repl");
// const {isBoolean} = require("lodash");

const createUserOpts = {
    schema: require('../schemas/user.json'),
    handler: async (req, reply) => {
        const hashedPassword = createHashPassword(req.body.password)
        const data = {
            login: req.body.login,
            password: hashedPassword
        }
        console.log(await User.findOne({login: data.login}) === null)
        if (await User.findOne({login: data.login}) === null) {
            const savedUser = await new User(data).save()
            const sanitizedUser = omit(savedUser._doc, ['password', '__v'])
            reply.send(sanitizedUser)
        } else {
            reply.send('RegError: User was registered')
        }
    }
}

const getAuthUserInfoOpts = {
    // schema: require(''),
    handler: async (req, reply) => {
        const authorizedUser = await req.jwtVerify()
        return [authorizedUser, req.user]
    }
}
const getQwe = {
    handler: async (req, reply) => {
        // console.log(req.headers.authorization)
        if (req.headers.authorization) {
            const authorizedUser = await req.jwtVerify()
            reply.send(authorizedUser)
        } else {
            reply.send('You need to login')
        }
    }
}
module.exports = function (fastify, options, next) {
    fastify.post('/user', createUserOpts)
    fastify.get('/user', getAuthUserInfoOpts)
    fastify.get('/qwe', getQwe)
    next()
}