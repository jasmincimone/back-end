const mongoose = require("mongoose")

async function mongooseConnect(){
    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewURLParser: true
    })
    await mongoose.connection
    console.log('MONGO DB CONNECTED!')
}

module.exports = mongooseConnect