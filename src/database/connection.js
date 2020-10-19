const Sequelize = require("sequelize");

const db = new Sequelize("nodetest","root","",{host:"127.0.0.1" , dialect:"mysql", operatorsAliases: false});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  db.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    require('../boostrap.js')();
  });

global.db =db;
module.exports = db;