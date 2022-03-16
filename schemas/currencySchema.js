const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
    currencyCode: {type: String, required: true},
    userID: {type: String, required: true},
})

const currency = mongoose.model('Currency', currencySchema)

module.exports = currency