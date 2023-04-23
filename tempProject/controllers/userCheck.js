module.exports = function (fastify, options, next) {
    fastify.decorate('authenticate', async (req, reply) => {
        try {
            await req.jwt.verify()
        } catch (err) {
            reply.send(err)
        }
    })
    next()
}