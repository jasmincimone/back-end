const mongoose = require("mongoose")

async function mongooseConnect(){
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('MONGO DB CONNECTED!')
}

module.exports = mongooseConnect