const mongoose = require('mongoose')

const schema = mongoose.Schema({
    startTown: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    finishTime: {
        type: Number,
        required: true
    },
    array: {
        type: Array
    },
    active: {
        type: Number,
        default: true
    }
})

module.exports = mongoose.model('CircleTrip', schema)