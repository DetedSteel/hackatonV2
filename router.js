const path = require('path')
const server = require('./server')

server.register(require('@fastify/autoload'), {
    dir: path.join(__dirname + '/routes'),
    maxDepth: 2
})