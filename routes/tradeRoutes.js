const express = require('express')
const Currency = require('../schemas/currencySchema')
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../middleware/jwt')

const User = require('../schemas/userSchema')
 
 // Create the Router
 const tradeRouter = express.Router()
 
 // Create the Routes
 tradeRouter.get('/', authenticateToken, (req, res) => {
     User.findById({_id: req.user._id}, (error, result) => {
         if(error){
             res.status(403).json({message: error.message})
         }
         else{
             res.status(200).json({Logged_In: result})
         }
     })
 })

 tradeRouter.put('/:id', authenticateToken, (req,res) => {
    let newsId = req.params.id
    console.log(req.user)
    User.findByIdAndUpdate({_id: req.user._id}, {$addToSet: {favorites: newsId}}, (error, faves) => {
        if(error){
            res.status(403).json({message: "ERROR"})
        }
        else{
            res.send('FAVORITED <3')
        }
    })
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

 tradeRouter.delete("/:id", authenticateToken, (req, res)=>{
     res.send('delete list of watched currencies by userID')
 })
 
 module.exports = tradeRouter;