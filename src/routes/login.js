const jwt = require('jsonwebtoken');
const config = require('config');
const users = require('../models/users.js');
const lodash = require('lodash');
const auth = require('./auth');
const role = require('./role');

//set mysql_jwtPrivateKey=keykey
module.exports = (app) => {
    app.post('/login', async (req, res) => {

      try{
        await users.findAll({
          limit: 1,
          where: {
            email: req.body.email
          },
          order: [ [ 'createdAt', 'DESC' ]]
        }).then(async function(entries){
          //console.log("-"+entries.toString()+"-");
            if(entries.toString()!=""){
              console.log(entries);
              const token = await jwt.sign({id:entries.id , role:entries.role}, config.get('jwtPrivateKey'));
              return res.status(200).header('x-auth-token',token).send({
                  message: 'login successfully!' ,
                  token: token ,
              });
            }
        });

        return res.status(400).send("u need to register");
      }catch(ex){
        //error medlleware
        return res.status(500).send("somethiung faild");

      }
    });


// [auth,role]
    app.get('/me',role, async (req, res) => {
    
      throw new Error('hamouda');
      await users.findAll({
          limit: 1,
          where: {
            id: req.body.id
          },
          order: [ [ 'createdAt', 'DESC' ]]
        }).then(async function(entries){
            if(entries.toString()!=""){
              return res.status(200).send(entries);
            }
        });

        return res.status(400).send("not found");
  });



   function asyncTryCatchMiddleware(handler){
    return async ( req , res , next ) => {
      try{
        await handler(req , res , next);
      }catch(ex){
        next();
      }
    }
  }

  //or use just require(express-async-errors); in top of file 
  app.get('/another',role, asyncTryCatchMiddleware(async (req , res,next) => {
//do what u do without try catch . i mean make it in one bloc
return res.status(400).send("somethings");
  }));




  };

