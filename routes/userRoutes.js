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
        res.status(200).json({data: result})
    })
})