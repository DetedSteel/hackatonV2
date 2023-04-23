const mongoose = require('mongoose')
const config = require('./config.json')
const {url, db, options} = config
mongoose.connect(`${url}/${db}`, options)
    .then((res) => {
        console.info('connect', res.collections)
    })
    .catch((error) => {
        console.error(error)
    })