const Town = require('../db/mongoose/models/Town')
const Edge = require('../db/mongoose/models/Edge')

const insertAllTownsOpts = {
    handler: async (req, reply) => {
        const allEdges = await Edge.find()
        // console.log(allEdges)
        let uniqueTowns = new Set()
        for (let i of allEdges) {
            uniqueTowns.add(i.startTown)
            uniqueTowns.add(i.finishTown)
        }

        for (const i of uniqueTowns) {
            await Town.insertMany({
                name: i
            })
        }
        console.log(uniqueTowns)
        reply.send('successful insertion')
    }
}

const deleteAllTownsOpts = {
    handler: async (req, reply) => {
        await Town.deleteMany()
        reply.send('successful deleted')
    }
}

const getAllTownsOpts = {
    handler: async (req, reply) => {
        reply.send(await Town.find())
    }
}

module.exports = function (fastify, opts, next) {
    fastify.put('/api/insert-all-towns', insertAllTownsOpts)
    fastify.delete('/api/delete-all-towns', deleteAllTownsOpts)
    fastify.get('/api/get-all-towns', getAllTownsOpts)
    next()
}