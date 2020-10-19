const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        console.log(config.get('jwtPrivateKey')+"/////////////////");
        console.log(token+"/////////////////");
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        //req.users = decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid token.'+ex);
    }
}

module.exports = auth;