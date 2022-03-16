const jwt = require('jsonwebtoken')

function generateAccessToken(username){
    return jwt.sign(username, process.env.JWT_SECRET)
}

function authenticateToken(req, res, next){
    const authHeader = req.get('Authorization')

    if(authHeader === null){
        res.status(403).json({message: 'FORBIDDEN.'})
    
    }
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.status(403).json({messsage: 'BAD LOGIN.'})
        }next()
    })
}

module.exports = {generateAccessToken, authenticateToken}