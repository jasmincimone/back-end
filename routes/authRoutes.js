const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

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

    // TODO Make helper
    let hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword

    //TODO Make model function
    User.create(user, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        else{
            res.status(201).json({users: result})
        }
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
        let password = req.body.password
        bcrypt.compare(password, result.password, async(error, matching)=>{
            if(error){
                res.status(403).json({message: error.message})
            }
            else {
            let token = jwt.sign(result.toObject(), process.env.JWT_SECRET, {expiresIn: 9000000})
            res.cookie("Authorization", token, { path: "/", expires: new Date(Date.now() + 9000000)}, "/" )
            return await res.send({jwt: token})
            }
        })

    })
})

module.exports = authRouter