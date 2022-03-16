const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
    created_by: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    favoriteCurrencies_title: {type: String, required: true},
    favoriteCurrencies_content: {type: String, required: true},
})


const currencyModel = mongoose.model('Currency', currencySchema)

module.exports = currencyModel