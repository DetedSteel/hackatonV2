const mongoose = require('mongoose')

const schema = mongoose.Schema({
    startTown: {
        type: String,
        required: true
    },
    finishTown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    typeTransportation: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Edge', schema)