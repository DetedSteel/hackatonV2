const {url, db, options} = require('./config.json')
const mongoose = require('mongoose')

mongoose.connect(`${url}/${db}`)
    .then((event) => {
        console.log('connected')
    })
    .catch(error => console.error(error))