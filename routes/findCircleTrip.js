const Town = require('../db/mongoose/models/Town')
const CircleTrip = require('../db/mongoose/models/CircleTrip')

const findPathsOpts = {
    handler: async (req, reply) => {
        const foundTown = await Town.findOne({name: req.params.nameTown})
        console.log(foundTown)
        if (foundTown) {
            const dijkstra = require('../algorithms/findCircleTrips')
            const dataFromDijkstra = await dijkstra(req.params.nameTown)
            for (let i of dataFromDijkstra) {
                const checkCircleTrip = await CircleTrip.find({
                    startTown: i.array[0].townName,
                    startTime: i.startDateMilliseconds,
                    finishTime: i.finishDateMilliseconds,
                    array: i.array,
                    active: true
                })
                // console.log(checkCircleTrip, checkCircleTrip.length)
                if (checkCircleTrip.length === 0) {
                    await CircleTrip.insertMany({
                        startTown: i.array[0].townName,
                        startTime: i.startDateMilliseconds,
                        finishTime: i.finishDateMilliseconds,
                        array: i.array
                    })
                }
            }
            const foundData = await CircleTrip.find({
                startTown: req.params.nameTown
            })
            reply.send(foundData)
        } else {
            reply.code(404).send("There is no way out of this city")
        }
    }
}

const getInfoCircleTripOpts = {
    handler: async (req, reply) => {
        const dataCircleTrip = await CircleTrip.findById(req.params.id)
        if (dataCircleTrip === {}) {
            reply.code(404).send('Data not found')
        } else {
            reply.send(dataCircleTrip)
        }
    }
}


module.exports = function (fastify, opts, next) {
    fastify.get('/api/find-circle-trip/:nameTown', findPathsOpts)
    fastify.get('/api/find-data-circle-trip/:id', getInfoCircleTripOpts)
    next()
}