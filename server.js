const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongooseConnect = require('./config')
const tradeRouter = require('./routes/tradeRoutes')
const morgan = require('morgan')
const cors = require('cors')
// STEP ONE - Create the App
const app = express()
// STEP TWO - Configure the App
dotenv.config()

// MIDDLE WARES!!!
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.use(morgan('dev'))

// ROUTES
app.use('/trade', tradeRouter)

// CREATE THE PORT
const PORT = process.env.PORT || 8000

// CREATE BASE ROUTE
app.use('/', (req, res)=>{
    res.status(200).json({message: "API UP and RUNNING!"})
})

// LISTEN
app.listen(PORT, ()=>{
    console.log(PORT)
    mongooseConnect()
})