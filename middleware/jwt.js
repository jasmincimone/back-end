const jwt = require('jsonwebtoken')

function generateAccessToken(username){
    return jwt.sign(username, process.env.JWT_SECRET)
}

function authenticateToken(req, res, next){
    const token = req.cookies.Authorization

    if(token === null){
        res.status(403).json({message: 'FORBIDDEN.'})
    
    }
    
    const decrypt = jwt.verify(Authorization, process.env.JWT_SECRET, (err, user) => {
        if(err){
            res.status(403).json({messsage: 'BAD LOGIN.'})
        }
        req.user = decrypt 

        next()
    })
}

module.exports = {generateAccessToken, authenticateToken}