const sequelize = require("sequelize");
//const db = require("db");
const db = require("../database/connection.js");

const users = db.define('users', {
  id:{
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    defaultValue: false,
    unique: true,
  },
  password: {
    type: sequelize.STRING,
    defaultValue: false,
  },
  age: {
    type: sequelize.STRING,
    defaultValue: false,
    allowNull:true
  },
  role: {
    type: sequelize.INTEGER,
    defaultValue: 0,
    allowNull:false
  }
});
users.associate = (models) => {
  post.hasMany(models.posts, {
    as: "posts",
    foreignKey: 'userId',
  });
}

module.exports = users;