const INF = 1e14
const Edge = require('../db/mongoose/models/Edge')
const Town = require('../db/mongoose/models/Town')
// require('../db/mongoose/index')

async function modifiedDijkstra(startedVertex) {
    const trips = await Edge.find()
    const towns = await Town.find()
    const townsIndex = {}
    for (let i = 0; i < towns.length; ++i) {
        townsIndex[towns[i].name] = i
    }
    console.log(townsIndex)
    const townsKeys = Object.keys(townsIndex)
    // console.log(townsKeys)
    // console.log(typeof trips, trips.length)
    // for(let i = 0; i < trips.length; ++i){
    //     trips[i].date = trips[i].date.getMilliseconds()
    // }
    // console.log(trips[0].date.getMilliseconds())
    // console.log(trips[0].date.getTime())

    let graph = []
    for (let i = 0; i < towns.length; ++i) {
        graph.push([])
    }

    for (let i = 0; i < trips.length; ++i) {
        graph[townsIndex[trips[i].startTown]].push({
            finishTownIndex: townsIndex[trips[i].finishTown],
            timeSending: trips[i].date.getTime()
        })
    }
    // console.log(graph)

    let dist = [], relatives = [], used = []
    for (let i = 0; i < towns.length; ++i) {
        dist.push(INF)
        relatives.push(-1)
        used.push(false)
    }
    dist[townsIndex[startedVertex]] = 0
    for (let i = 0; i < towns.length; ++i) {
        let vertex = -1
        for (let j = 0; j < towns.length; ++j) {
            if (!used[j] && (vertex === -1 || dist[j] < dist[vertex])) {
                vertex = j
            }
        }

        if (vertex === -1 || dist[vertex] === INF) {
            break
        }

        used[vertex] = true

        for (let j = 0; j < graph[vertex].length; ++j) {
            let infoForNextVertex = graph[vertex][j]
            if (!used[infoForNextVertex.finishTownIndex] && dist[vertex] <= dist[infoForNextVertex.finishTownIndex]) {
                dist[infoForNextVertex.finishTownIndex] = infoForNextVertex.timeSending + 1
                relatives[infoForNextVertex.finishTownIndex] = vertex
            }
        }
    }

    let arrayVertexFinish = []
    let usedArrayVertexFinish = []

    for (let i = 0; i < towns.length; ++i) {
        usedArrayVertexFinish.push(false)
    }

    for (let i = 0; i < graph.length; ++i) {
        for (let j = 0; j < graph[i].length; ++j) {
            if (graph[i][j].finishTownIndex === townsIndex[startedVertex] && dist[i] !== INF) {
                arrayVertexFinish.push(i)
            }
        }
    }
    // console.log(dist)
    // console.log(arrayVertexFinish)

    let circlePathes = []
    for (let i = 0; i < arrayVertexFinish.length; ++i) {
        let vtx = arrayVertexFinish[i]
        if (!usedArrayVertexFinish[vtx]) {
            let circlePath = {
                startDateMilliseconds: INF,
                finishDateMilliseconds: 0,
                array: []
            }
            circlePath.array.push({
                id: circlePath.array.length, townName: startedVertex
            })

            for (let v = vtx; v !== townsIndex[startedVertex] && v !== -1; v = relatives[v]) {
                circlePath.array.push({
                    id: circlePath.array.length,
                    townName: townsKeys[v]
                })
                circlePath.finishDateMilliseconds = Math.max(circlePath.finishDateMilliseconds, dist[v])
            }
            for (let j of graph[townsIndex[startedVertex]]) {
                if (j.finishTownIndex === townsIndex[circlePath.array[circlePath.array.length - 1].townName]) {
                    circlePath.startDateMilliseconds = Math.min(circlePath.startDateMilliseconds, j.timeSending)
                }
            }
            circlePath.array.push({
                id: circlePath.array.length,
                townName: startedVertex
            })
            circlePath.array.reverse()
            usedArrayVertexFinish[vtx] = true
            // console.log(circlePath)
            circlePathes.push(circlePath)
        }
    }
    // console.log(circlePathes)
    return circlePathes
}

// modifiedDijkstra('Калуга')
//     .catch(err => console.log(err))
module.exports = modifiedDijkstra