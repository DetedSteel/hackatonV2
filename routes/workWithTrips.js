const Edge = require('../db/mongoose/models/Edge')
const deleteAllTrips = {
    handler: async (req, reply) => {
        await Edge.deleteMany()
        reply.send('all data delete')
    }
}

const addToDBTripsOpts = {
    handler: async (req, reply) => {
        const data = require('../algorithms/parseCsvData')
        for (let i of data) {
            await Edge.insertMany({
                startTown: i.startTown,
                finishTown: i.finishTown,
                date: i.date,
                typeTransportation: i.typeTransportation
            })
        }
        reply.send(data)
    }
}

const getAllTripsOpts = {
    handler: async (req, reply) => {
        reply.send(await Edge.find())
    }
}

const getInfoTripOpts = {
    handler: async(req, reply)=>{
        reply.send(await Edge.findOne({_id: req.params.id}))
    }
}

module.exports = function (fastify, options, next) {
    fastify.put('/api/insert-all-trips', addToDBTripsOpts)
    fastify.delete('/api/delete-all-trips', deleteAllTrips)
    fastify.get('/api/get-all-trips', getAllTripsOpts)
    fastify.get('/api/get-info-trip/:id', getInfoTripOpts)
    next()
}
