const path = require('node:path')
const importDir = require('directory-import')

const routesDir = './routes'

const schemas = importDir({directoryPath: './schemas', importMethod: "sync"})
const isObject = require('lodash/isObject')
const forEach = require('lodash/forEach')
const has = require('lodash/has')
const isFunc = require('lodash/isFunction')
const server = require('./server')
const isArray = require('lodash/isArray')
const autoLoad = require("@fastify/autoload");


server.register(autoLoad, {
    dir: path.join(__dirname + '/routes'),
    maxDepth: 2
})
