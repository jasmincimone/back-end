const express = require('express');
const logoutRoute = express.Router();

logoutRoute.post('/', (req, res) => {
    res.clearCookie("Authorization")
    return res.status(200).redirect('/login')
})

module.exports = logoutRoute