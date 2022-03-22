const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: ({type: String, required: true}),
    password: ({type: String, required: true}),
    email: ({type: String, required: true}),
    favorites: ({type: Array})
})

const user = mongoose.model('User', userSchema)

module.exports = user