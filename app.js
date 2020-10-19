require('express-async-errors');
const express = require('express');
const logger = require('morgan');
//const bodyParser = require('body-parser');
//const config = require('config');
const helmet = require('helmet');
const app = express();
const error = require('./src/middleware/error.js');
const winston = require('winston');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));


app.use(express.json());
app.use(express.urlencoded({extende: true}));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(helmet());

app.use(express.Router());


/*app.use(function(err,req,res,next){
          //error medlleware
          return res.status(500).send("somethiung faild. "+err);
});*/



require('./src/routes/route_post.js')(app);
require('./src/routes/route_user.js')(app);
require('./src/routes/login.js')(app);

//db connection
require('./src/database/connection.js');
//require('./src/boostrap')();

app.get('/' , (req , res) =>{
    res.send('hello world');
});

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));


  app.use(error);
  const http = require('http');
  const port = parseInt(process.env.PORT, 10) || 8000;
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`The server is running at localhost:${port}`);
  });

//module.exports = app;
