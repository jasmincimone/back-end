const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../schemas/userSchema')
const authenticateToken = require('../middleware/jwt')


authRouter.get('/', (req, res) => {
    res.status(200).json({message: "Authorization Up!"})
})


authRouter.post('/register', async(req ,res)=>{
    let user = req.body
    let password = user.password
    let username = user.username
    let salt = Number(process.env.SALT)

    //TODO Make DataValidation Middleware LATER
    if (!password || !user.username){
        res.status(400).json({message: "Please have a username AND password"})
    }

    // TODO Make helper
    let hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword

    //TODO Make model function
    User.create(user, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === undefined || result === null){
            res.status(400).json({message: "Please make a unique user"})
        }
        let token = jwt.sign(username, process.env.JWT_SECRET)
        res.setHeader('Authorization', token)
        res.status(200).json({data: result, token: token})
    })
})

authRouter.post('/login', (req, res)=>{
    let username = req.body.username
    let password = req.body.password

    //TODO Make DataValidation Middleware LATER
    if (!password || !username){
        res.status(400).json({message: "Please have a username AND password"})
    }

    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "User Not Found"})
        }
        bcrypt.compare(password, result.password, (error, matching)=>{
            if(error){
                res.status(403).json({message: error.message})
            }
            if(matching === false){
                res.status(403).json({message: "Either username or password is incorrect"})
            }
            let token = jwt.sign(username, process.env.JWT_SECRET)
            res.setHeader('Authorization', token)
            res.status(200).json({data: result, token: token})
        })
    })
})

// authRouter.get('/', authenticateToken, (req, res)=>{
//     User.find((error, result)=>{
//         if(error){
//             res.status(404).json({message: error.message})
//         }
//         if(result === null || result === undefined || result === []){
//             res.status(404).json({message: "NOT FOUND"})
//         }
//         res.status(200).json({data: result})
//     })
// })

module.exports = authRouter