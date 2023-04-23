// const repl = require("repl");
const fastify = require('fastify')({logger: true})
fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
})
console.log('jwt', fastify.jwt)
fastify.post('/signup', (req, reply) => {
    // const token = fastify.jwt.sign({ payload })
    // reply.send({ token })
    console.log(fastify.jwt)
    reply.send(fastify.jwt)
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
})