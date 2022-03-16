const express = require('express')
const Currency = require('../schemas/currencySchema')
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/jwt')
 
 // Create the Router
 const tradeRouter = express.Router()
 
 // Create the Routes
 tradeRouter.get('/', (req, res) => {
     res.send('FETCH CURRENCY DATA')
 })
 

 tradeRouter.get("/:username", authenticateToken, (req, res) => {
    //GET all currencies by username
    let username = req.params.username

    Currency.find({created_by: username}, (err, currencies) =>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message: currencies})
    })
})
 
 tradeRouter.post("/:username", authenticateToken, (req, res) => {
      //CREATE favoriteCurrencies list & assign it to username
    let username = req.params.username
    let favoriteCurrencies = req.body
    favoriteCurrencies.created_by = username
    favoriteCurrencies.created_at = Date.now()

    Currency.create(favoriteCurrencies, (err, currency) =>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message: currency})
    })
})
 
 tradeRouter.put("/:id", (req, res)=>{
     res.send('update list of watched currencies by userID')
 })

 tradeRouter.delete("/:id", (req, res)=>{
     res.send('delete list of watched currencies by userID')
 })
 
 module.exports = tradeRouter;