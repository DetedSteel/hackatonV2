const Edge = require('../db/mongoose/models/Edge')
const Town = require('../db/mongoose/models/Town')

const addTripOpts = {
    schema: require('../schemas/addTrip.json'),
    handler: async (req, reply) => {
        const body = req.body

        if (!await Town.findOne({name: body.startTown})) {
            await Town.insertMany({name: body.startTown})
        }

        if (!await Town.findOne({name: body.finishTown})) {
            await Town.insertMany({name: body.finishTown})
        }
        reply.send((await Edge.insertMany({
            startTown: body.startTown,
            finishTown: body.finishTown,
            date: new Date(new Date(body.date).getTime() + 3 * 60 * 60 * 1000),
            typeTransportation: 'любой'
        }))[0])
        // reply.send(new Date(new Date(body.date).getTime() + 3 * 60 * 60 * 1000))
    }
}

module.exports = function (fastify, opts, next) {
    fastify.post('/api/add-new-trip', addTripOpts)

    next()
}