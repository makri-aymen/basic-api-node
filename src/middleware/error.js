const winston = require('winston');

module.exports =  function(err,req,res,next){

        winston.error(err.message,err);
        console.log('---------------------------------------------------------');
        //error
        //warn
        //info
        //verbose
        //debug
        //silly

        //error medlleware
        return res.status(500).send("somethiung faild. "+err);
};