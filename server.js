const server = require('fastify')({logger: true})

server.register(require('@fastify/swagger'))
server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs'
})

server.register(require('@fastify/cors'))

server.listen({port: 1060, host: "172.20.21.222"})
    .catch(err => console.log(err))

module.exports = server