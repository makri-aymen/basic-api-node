const jwt = require('jsonwebtoken');
const config = require('config');
const users = require('../models/users.js');

function role(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        if(!decoded.role=='0') return res.status(200).send('Access true.');

        next();
    }catch(ex){
        res.status(400).send('not valide because of role.'+ex);
    }
}

module.exports = role;