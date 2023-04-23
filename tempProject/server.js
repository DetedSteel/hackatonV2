const server = require('fastify')({logger: true})

server.register(require("@fastify/jwt"), {
    secret: 'ElleryRain'
})
server.register(require("@fastify/swagger"))
server.register(require("@fastify/swagger-ui"),{
    routePrefix: '/docs'
})
console.log('jwt', server.jwt)
server.listen(3000)
    .catch(console.error)

module.exports = server