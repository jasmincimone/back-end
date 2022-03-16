const express = require('express')
 const Currency = require('../schemas/currencySchema')
 
 // Create the Router
 const tradeRouter = express.Router()
 
 // Create the Routes
 tradeRouter.get('/', (req, res) => {
     res.send('FETCH CURRENCY DATA')
 })

 tradeRouter.get("/:id", (req, res)=>{
    res.send('get list of watched currencies by userID')
})
 
 tradeRouter.post("/:id", (req, res)=>{
     res.send('POST REQUEST. ADD NEW CURRENCY TO LIST')
     })
 
 tradeRouter.put("/:id", (req, res)=>{
     res.send('update list of watched currencies by userID')
 })

 tradeRouter.delete("/:id", (req, res)=>{
     res.send('delete list of watched currencies by userID')
 })
 
 module.exports = tradeRouter;